<script setup lang="ts">
import JSZip from 'jszip';
import { AlertTriangle, FolderOpen } from 'lucide-vue-next';
import { ref } from 'vue';
import PackButton from './PackButton.vue';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const props = defineProps<{
  loading: boolean;
  showButton?: boolean;
}>();

const emit = defineEmits<{
  upload: [file: File];
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const dragActive = ref(false);
const selectedFolder = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

// Common validation logic
const validateFolder = (files: File[]): boolean => {
  errorMessage.value = null;

  if (files.length === 0) {
    errorMessage.value = 'The folder is empty.';
    return false;
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_FILE_SIZE) {
    const sizeMB = (totalSize / (1024 * 1024)).toFixed(1);
    errorMessage.value = `File size (${sizeMB}MB) exceeds the 10MB limit`;
    return false;
  }

  return true;
};

// Create ZIP file
const createZipFile = async (files: File[], folderName: string): Promise<File> => {
  const zip = new JSZip();

  for (const file of files) {
    const path = file.webkitRelativePath || file.name;
    zip.file(path, file);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  return new File([zipBlob], `${folderName}.zip`);
};

// Common folder processing logic
const processFolder = async (files: File[], folderName: string): Promise<void> => {
  if (!validateFolder(files)) {
    selectedFolder.value = null;
    return;
  }

  const zipFile = await createZipFile(files, folderName);
  selectedFolder.value = folderName;
  emit('upload', zipFile);
};

// File selection handler
const handleFileSelect = async (files: FileList | null): Promise<void> => {
  if (!files || files.length === 0) return;

  const fileArray = Array.from(files);
  const folderName = files[0].webkitRelativePath.split('/')[0];

  await processFolder(fileArray, folderName);
};

// Folder drop handler
const handleFolderDrop = async (event: DragEvent): Promise<void> => {
  event.preventDefault();
  dragActive.value = false;
  errorMessage.value = null;

  if (!event.dataTransfer?.items?.length) return;

  // Check directory reading capability
  if (!('webkitGetAsEntry' in DataTransferItem.prototype)) {
    errorMessage.value = "Your browser doesn't support folder drop. Please use the browse button instead.";
    return;
  }

  const entry = event.dataTransfer.items[0].webkitGetAsEntry();
  if (!entry?.isDirectory) {
    errorMessage.value = 'Please drop a folder, not a file.';
    return;
  }

  const folderName = entry.name;

  try {
    const files = await collectFilesFromEntry(entry);
    await processFolder(files, folderName);
  } catch (error) {
    console.error('Error processing dropped folder:', error);
    errorMessage.value = 'Failed to process the folder. Please try again or use the browse button.';
  }
};

const isFileEntry = (entry: FileSystemEntry): entry is FileSystemFileEntry => {
  return entry.isFile;
};
const isDirectoryEntry = (entry: FileSystemEntry): entry is FileSystemDirectoryEntry => {
  return entry.isDirectory;
};

// Recursively collect files from entry
const collectFilesFromEntry = async (entry: FileSystemEntry, path = ''): Promise<File[]> => {
  if (isFileEntry(entry)) {
    return new Promise((resolve, reject) => {
      entry.file((file: File) => {
        // Create custom file with path information
        const customFile = new File([file], file.name, {
          type: file.type,
          lastModified: file.lastModified,
        });

        // Add relative path information
        Object.defineProperty(customFile, 'webkitRelativePath', {
          value: path ? `${path}/${file.name}` : file.name,
        });

        resolve([customFile]);
      }, reject);
    });
  }

  if (isDirectoryEntry(entry) && entry.createReader) {
    return new Promise((resolve, reject) => {
      const dirReader = entry.createReader();
      const allFiles: File[] = [];

      // Function to read entries in directory
      function readEntries() {
        dirReader.readEntries(async (entries: FileSystemEntry[]) => {
          if (entries.length === 0) {
            resolve(allFiles);
          } else {
            try {
              // Process each entry
              for (const childEntry of entries) {
                const newPath = path ? `${path}/${childEntry.name}` : childEntry.name;
                const files = await collectFilesFromEntry(childEntry, newPath);
                allFiles.push(...files);
              }
              // Continue reading (some browsers return entries in batches)
              readEntries();
            } catch (error) {
              reject(error);
            }
          }
        }, reject);
      }

      readEntries();
    });
  }

  return []; // If neither file nor directory
};

const triggerFileInput = () => {
  fileInput.value?.click();
};
</script>

<template>
  <div class="upload-wrapper">
    <div
      class="upload-container"
      :class="{ 'drag-active': dragActive, 'has-error': errorMessage }"
      @dragover.prevent="dragActive = true"
      @dragleave="dragActive = false"
      @drop.prevent="handleFolderDrop($event)"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        directory
        webkitdirectory
        mozdirectory
        class="hidden-input"
        @change="(e) => handleFileSelect((e.target as HTMLInputElement).files)"
      />
      <div class="upload-content">
        <div class="upload-icon">
          <AlertTriangle v-if="errorMessage" class="icon-error" size="20" />
          <FolderOpen v-else class="icon-folder" size="20" />
        </div>
        <div class="upload-text">
          <p v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </p>
          <p v-else-if="selectedFolder" class="selected-file">
            Selected: {{ selectedFolder }}
            <button class="clear-button" @click.stop="selectedFolder = null">×</button>
          </p>
          <template v-else>
            <p>Drop your folder here or click to browse (max 10MB)</p>
          </template>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showButton" class="pack-button-container">
    <PackButton
      :loading="loading"
      :isValid="!!selectedFolder"
    />
  </div>
</template>

<style scoped>
.upload-wrapper {
  width: 100%;
  min-width: 0;
}

.upload-container {
  border: 2px dashed var(--vp-c-border);
  border-radius: 8px;
  padding: 0 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 50px;
  display: flex;
  align-items: center;
  background: var(--vp-c-bg);
  user-select: none;
  width: 100%;
  box-sizing: border-box;
}

.upload-container:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
}

.drag-active {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
}

.has-error {
  border-color: var(--vp-c-danger-1);
}

.hidden-input {
  display: none;
}

.upload-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
}

.upload-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-folder {
  color: var(--vp-c-text-1);
}

.icon-error {
  color: var(--vp-c-danger-1);
}

.upload-text {
  flex: 1;
  font-size: 14px;
  min-width: 0;
  overflow: hidden;
}

.upload-text p {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.error-message {
  color: var(--vp-c-danger-1);
}

.selected-file {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  overflow: hidden;
}

.clear-button {
  background: none;
  border: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 1.2em;
  padding: 0 4px;
  line-height: 1;
  flex-shrink: 0;
  pointer-events: auto; /* Re-enable pointer events for button */
}

.clear-button:hover {
  color: var(--vp-c-text-1);
}

.pack-button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

@media (max-width: 640px) {
  .upload-text p {
    font-size: 13px;
  }
}
</style>
