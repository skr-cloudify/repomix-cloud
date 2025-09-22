# 설정

## 빠른 시작

설정 파일 생성:
```bash
repomix --init
```

## 설정 파일

`repomix.config.json`:
```json
{
  "output": {
    "filePath": "repomix-output.xml",
    "style": "xml",
    "parsableStyle": true,
    "compress": false,
    "headerText": "사용자 정의 헤더 텍스트",
    "instructionFilePath": "repomix-instruction.md",
    "fileSummary": true,
    "directoryStructure": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "copyToClipboard": false,
    "includeEmptyDirectories": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100
    }
  },
  "include": ["**/*"],
  "ignore": {
    "useGitignore": true,
    "useDefaultPatterns": true,
    "customPatterns": ["tmp/", "*.log"]
  },
  "security": {
    "enableSecurityCheck": true
  }
}
```

## 전역 설정

전역 설정 생성:
```bash
repomix --init --global
```

위치:
- Windows: `%LOCALAPPDATA%\Repomix\repomix.config.json`
- macOS/Linux: `~/.config/repomix/repomix.config.json`

## 무시 패턴

우선순위:
1. CLI 옵션 (`--ignore`)
2. `.repomixignore`
3. `.gitignore` 및 `.git/info/exclude`
4. 기본 패턴

`.repomixignore` 예시:
```text
# 캐시 디렉토리
.cache/
tmp/

# 빌드 출력
dist/
build/

# 로그
*.log
```

## 기본 무시 패턴

기본적으로 포함되는 일반적인 패턴:
```text
node_modules/**
.git/**
coverage/**
dist/**
```

전체 목록: [defaultIgnore.ts](https://github.com/yamadashy/repomix/blob/main/src/config/defaultIgnore.ts)

## 예제

### 코드 압축

`output.compress`를 `true`로 설정하면, Repomix는 구현 세부 사항을 제거하면서 필수적인 코드 구조를 추출합니다. 이를 통해 중요한 구조적 정보를 유지하면서 토큰 수를 줄일 수 있습니다.

자세한 내용과 예제는 [코드 압축 가이드](code-compress)를 참조하세요.

### Git 통합

`output.git` 설정을 통해 Git 히스토리를 기반으로 파일을 정렬하는 방법과 Git 차이점을 포함하는 방법을 제어할 수 있습니다:

- `sortByChanges`: `true`로 설정하면, 파일은 Git 변경 횟수(해당 파일을 수정한 커밋 수)에 따라 정렬됩니다. 더 많은 변경이 있는 파일이 출력의 하단에 표시됩니다. 이는 더 활발하게 개발되는 파일을 우선순위화하는 데 도움이 됩니다. 기본값: `true`
- `sortByChangesMaxCommits`: 파일 변경 횟수를 계산할 때 분석할 최대 커밋 수입니다. 기본값: `100`
- `includeDiffs`: `true`로 설정하면, Git 차이점을 출력에 포함합니다(작업 트리와 스테이지된 변경사항을 별도로 포함). 이를 통해 저장소의 대기 중인 변경 사항을 확인할 수 있습니다. 기본값: `false`

설정 예시:
```json
{
  "output": {
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100,
      "includeDiffs": true
    }
  }
}
```

### 주석 제거

`output.removeComments`를 `true`로 설정하면, 지원되는 파일 유형에서 주석이 제거되어 출력 크기를 줄이고 핵심 코드 내용에 집중할 수 있습니다.

지원되는 언어와 자세한 예제는 [주석 제거 가이드](comment-removal)를 참조하세요.
