/*
**  Game skills
*/

export const skills = {

  // Clonage
  clonage: {
    name: "Clonage",
    description: "Si le personnage meurt, il réapparait à la scène suivante dans un arc éléctrique bleuté, tout nu. Si c'est un PJ, il relance ses 2D12 PV du niveau 1. Si c'est un PNJ, il retrouve tous ses PV."
  },

  // Flingue-saucisse
  saucisse: {
    name: "Flingue à saucisses",
    description: "Ce flingue technomagique est uniquement utilisable par les Hommes-Porcs pour une raison mystérieuse. Le tireur fait un coup critique sur un 11 ou un 12 si l'attaque est réussie."
  },

  // Riche
  riche: {
    key: "riche",
    fuse: () => { return {
      name: "Très riche",
      description: "Le personnage est très, TRÈS riche. Il peut tout acheter (ou presque). Encore plus balèze que le talent \"Riche\"."
    }},
    name: "Riche",
    description: "Le personnage est riche. Il peut tout acheter (ou presque)."
  },

  // Artisanat cafaroide
  artisanat: {
    name: "Artisanat insectoïde",
    description: "Dispose d'un artefact-insecte au choix, avec l'accord du meneur. Ça ne peut pas être une arme, directement ou indirectement."
  },

  // Technomagie
  technomagie: {
    name: "Technomagie",
    description: "Le personnage lance des sortilèges ou des formules technomagiques pour modifier la réalité déjà fluctuante. Il peut en lancer autant qu'il veut, quand il veut. Cependant, il ne peut pas les choisir : chaque sort est tiré au hasard dans la table des formules magiques."
  },

  // Armure
  armure: function(faces) {
    return {
      key: "armure",
      faces: faces,
      fuse: val => skills.armure(faces + val),
      name: `Armure (D${faces})`,
      description: `Dispose d'une protection naturelle, ou non. Sa protection est de 1D${faces}. Réduisez d'autant les blessures à chaque attaque.`
    }
  }
}
