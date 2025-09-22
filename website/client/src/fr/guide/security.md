# Sécurité

## Fonctionnalité de vérification de sécurité

Repomix utilise [Secretlint](https://github.com/secretlint/secretlint) pour détecter les informations sensibles dans vos fichiers:
- Clés d'API
- Jetons d'accès
- Identifiants
- Clés privées
- Variables d'environnement

## Configuration

Les vérifications de sécurité sont activées par défaut.

Désactivation via CLI:
```bash
repomix --no-security-check
```

Ou dans `repomix.config.json`:
```json
{
  "security": {
    "enableSecurityCheck": false
  }
}
```

## Mesures de sécurité

1. **Exclusion des fichiers binaires**: Les fichiers binaires ne sont pas inclus dans la sortie
2. **Compatible avec Git**: Respecte les motifs `.gitignore`
3. **Détection automatisée**: Analyse les problèmes de sécurité courants:
    - Identifiants AWS
    - Chaînes de connexion aux bases de données
    - Jetons d'authentification
    - Clés privées

## Lorsque la vérification de sécurité trouve des problèmes

Exemple de sortie:
```bash
🔍 Vérification de sécurité:
────────────────────────────
2 fichier(s) suspect(s) détecté(s) et exclu(s):
1. config/credentials.json
  - Clé d'accès AWS trouvée
2. .env.local
  - Mot de passe de base de données trouvé
```

## Meilleures pratiques

1. Toujours examiner la sortie avant de la partager
2. Utiliser `.repomixignore` pour les chemins sensibles
3. Garder les vérifications de sécurité activées
4. Supprimer les fichiers sensibles du dépôt

## Signalement des problèmes de sécurité

Vous avez trouvé une vulnérabilité de sécurité? Veuillez:
1. Ne pas ouvrir un ticket public
2. Envoyer un email à: koukun0120@gmail.com
3. Ou utiliser les [Avis de sécurité GitHub](https://github.com/yamadashy/repomix/security/advisories/new)
