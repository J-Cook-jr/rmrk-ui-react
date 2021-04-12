const foundersListSection = `Super Founder eggs were reserved for the very earliest supporters - those who believed in the RMRK team before we had a single line of Kanaria code written. 
These pioneers of the industry are long-time supporters of the NFT and crypto ecosystem, and we couldn't be prouder of having them on board. 
They will come forward at their own pace. The Super Founder eggs entitle them to a 0.5% rev trait* for life (life of the bird, that is!).
            
The Founder eggs will hatch birds that will provide their owner with a 0.1% rev trait*, along with other attributes and traits. To obtain a coveted Founder egg (one per verified Kusama account!),
join the [pre-claim](/preclaim).

Alongside generated art where birds' looks change depending on randomly picked traits and people's EMOTEs on the eggs, the first 99 birds - that is, all Super Founder and Founder eggs - will also each have a special, one-of-a-kind custom artwork drawn by a guest artist. Owners will be able to switch this art style dynamically on the NFT itself by interacting with it.
`;

const commonListSection = `Limited Edition eggs, while more plentiful than the other categories, are still extremely limited in the grand scheme of things. Only 8900 of these will ever exist, each with a small chance to score a 0.1% rev trait* alongside additional benefits that are both cosmetic and applicable to the RMRK platform and its sister platforms. Do not underestimate these - they may be the cheapest to claim, but due to the randomness it's entirely possible that one of these birds is the one that ends up getting a combination of traits so epic it'll outdo even the best Super Founders birds.`;

const rareListSection = `Only 900 of these will ever exist, and each has a 5.5% chance of getting the 0.1% rev trait*. The look of the birds will come from a combination of people's EMOTE's and the random roll for traits, sourced by the Kusama blockchain itself. Rare birds will have certain advantages over Limited Edition birds - we'll reveal them all over the next few weeks.`;

const allSections = {
  foundersListSection,
  commonListSection,
  rareListSection,
};

export const getMarkdownSection = (
  section: 'foundersListSection' | 'commonListSection' | 'rareListSection',
) => allSections[section] || '';
