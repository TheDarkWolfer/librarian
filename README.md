# 𝕷𝖎𝖇𝖗𝖆𝖗𝖎𝖆𝖓
## Un frontend pour l'API d'OpenLibrary

## Installation
### I. Préparation
Il vous faudra les outils nécessaires pour récupérer le dépôt git. Vous pouvez le faire avec un navigateur, ou depuis la ligne de commande.
#### I-a. Ligne de commande
Il vous faut au moins git, et npm ; selon votre distribution, la méthode pour les installer varie ;
```bash
# Debian (& debian-based)
sudo apt install -y git npm
```

```bash
# Fedora (& fedora-based)
sudo dnf install git nodejs -y
```

```bash
# Arch (& arch-based). Avec yay comme gestionnaire de paquets
yay -S git npm
```

```batch
# Windows...?
winget install --id Git.Git -e --source winget
winget install OpenJS.NodeJS.LTS -s winget
```

> Si votre distribution n'est pas listée ci-dessus, les commandes d'installation de ces deux paquets sont souvent répertoriées sur les forums de votre distribution et sont relativement simples à adapter

Puis, une fois cette opération terminée, il vous faudra cloner le dépôt sur votre machine :
```bash
git clone https://github.com/TheDarkWolfer/librarian
```

#### I-b. Installation des dépendances
Une fois le code source récupéré, naviguez jusqu'à l'emplacement du fichier `package.json` dans le répertoire du projet. Ouvrez-y un terminal, et lancer la commande suivante pour installer toutes les dépendances d'un coup :
```bash
npm install
```

#### I-c. Lancement
Avec les dépendances installées, vous pouvez lancer l'application **en mode développement** avec la commande suivante ; cela vous permet de vérifier son bon fonctionnement avant tout déploiement en production
```bash
npm run dev
```
Suite à cela, si tout fonctionne comme attendu, il faut utiliser la commande ci-dessous pour lancer l'application en mode développement ; cela la rend accessible depuis d'autres machines, et désactive tout endpoint de développement.
```bash
npm run prod
```

#### I-d. Utilisation
Vous pouvez naviguer au port 5173 du serveur, ou bien établir une règle de transmission NAT, dresser un proxy, ou toute autre solution exposant le port 5173 aux ports 80 ou 443 pour l'accès utilisateur.ices

### II. Tests
Vous pouvez lancer les tests de l'application avec la commande suivante :
```bash
npm run test #Ou `npm test`
```
Il n'y a actuellement que trois tests s'assurant la disponibilité du site, mais il sera possible d'étendre cette suite de tests à l'avenir.

### III. Activisme
Il y a une fonctionnalité de flagging des auteur.ices ; certain.es auteur.ices ont agi de manière discutable et pris des positions qui ont activement contribué à la persécution de certaines minorités. Ce faisant, ces auteurs reçoivent automatiquement une bannière explicant la situation ; ***cette bannière n'empêche pas l'accès aux données, et a un rôle purement informatif***. Cependant, si vous souhaitez désactiver cette fonctionnalité, vous pouvez lancer le projet avec la variable d'environnement `VITE_ENABLE_ACTIVISM` à `false` (activé par défaut).
> Je vous prie de ne pas désactiver cette bannière. C'est un sujet que je considère important, surtout par le climat politique actuel.
