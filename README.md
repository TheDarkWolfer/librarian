# 𝕷𝖎𝖇𝖗𝖆𝖗𝖎𝖆𝖓
## Un frontend pour l'API d'OpenLibrary

## Installation
### I. Préparation
Il vous faudra les outils nécessaires pour récupérer le dépôt git. Vous pouvez le faire avec un navigateur, ou depuis la ligne de commande.
#### I-a. Ligne de commande
Il vous faut au moins git, et npm ; selon votre distribution, la méthode pour les installer varie ;
```shell
# Debian (& debian-based)
sudo apt install -y git npm
```

```shell
# Fedora (& fedora-based)
sudo dnf install git nodejs -y
```

```shell
# Arch (& arch-based). Avec yay comme gestionnaire de paquets
yay -S git npm
```

```batch
# Windows...?
winget install --id Git.Git -e --source winget
winget install OpenJS.NodeJS.LTS -s winget
```

> Si votre distribution n'est pas listée ci-dessus, les commandes d'installation de ces deux paquets sont souvent répertoriées sur les forums de votre distribution et sont relativement simples à adapter

Puis, une fois cette opération terminée

#### I-b. Installation des dépendances
Une fois le code source récupéré, naviguez jusqu'à l'emplacement du fichier `package.json` dans le répertoire du projet. Ouvrez-y un terminal, et lancer la commande suivante pour installer toutes les dépendances d'un coup :
```shell
npm install
```

#### I-c. Lancement
Une fois les dépendances installées, vous pouvez lancer l'application avec la commande suivante :
```shell
npm run dev
```
