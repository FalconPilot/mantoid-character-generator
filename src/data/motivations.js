// Local functions
import { generator, dataset } from '../helpers/generators'

/*
**  Motivations generators
*/

const phrases = [
  "Je veux tout savoir ! Les secrets de L'Univers, d'Azathoth...",
  "Quelqu'un m'a fait du mal. Je vais le buter et violer son crâne.",
  "Je suis un séducteur, un branleur professionnel et/ou un amateur de partouzes mutantes. Ce monde est pourri, je vais donc l'oublier dans le stupre.",
  "Mon petit plaisir, c'est de tout détruire juste parce-que j'en ai le pouvoir. Les meubles, les gens, les décors et même les parties de jeu comme celle-ci.",
  "Être un élu divin ne suffit pas. La vie est tellement courte et si fragile... Je dois trouver un moyen pour ne jamais, jamais crever : un elixir, un démon, bouffer des zazamons... Peu importe.",
  "Androgyne-Roi fait n'importe-quoi. Je ferais bien mieux, à sa place. Le Crabe aux pinces d'or, c'est encore pire. Heureusement, j'ai un plan secret de domination de l'univers. Et si les gens ne sont pas d'accord, je les soumettrais."
]

export const motivations = generator("motivations", dataset(phrases.map((phrase, i) => { return {
  key: `motiv-${i + 1}`,
  amt: 2,
  data: phrase
}})))
