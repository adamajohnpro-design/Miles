# 📋 Règles de Développement - Miles

## 🔄 Règle #1 : Push GitHub à chaque modification
**IMPORTANT** : Chaque modification de code doit être poussée sur GitHub immédiatement après avoir été effectuée.

### Processus obligatoire :
1. ✅ Faire les modifications
2. ✅ Vérifier que tout fonctionne
3. ✅ `git add .`
4. ✅ `git commit -m "description claire de la modification"`
5. ✅ `git push`

**Ne jamais laisser des modifications non commitées/pushées.**

---

## 🚫 Règle #2 : Ne jamais modifier les autres features
**CRITIQUE** : Lorsque tu travailles sur une feature/modification spécifique, tu ne dois **JAMAIS** modifier ou toucher aux autres features existantes.

### Principes :
- ✅ Modifier **uniquement** le code nécessaire pour la feature en cours
- ✅ Ne pas refactoriser d'autres parties du code "en passant"
- ✅ Ne pas "améliorer" d'autres features non demandées
- ✅ Si une modification impacte d'autres features, c'est une **nouvelle feature** à traiter séparément

### Exemple :
- ❌ **MAUVAIS** : "Je modifie l'écran d'accueil et en profite pour améliorer l'écran de profil"
- ✅ **BON** : "Je modifie uniquement l'écran d'accueil, je ne touche pas au reste"

---

## 📝 Notes
- Ces règles sont **obligatoires** et doivent être suivies à chaque modification
- En cas de doute, demander confirmation avant de modifier du code existant

