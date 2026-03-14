// ============================================================
//  CBSE Class 12 Chemistry — Full Reaction Dataset
//  Filtered to only include active reactants
// ============================================================

export const chemicals = [
  // -- Active Inorganic Reactants --
  { id: 'h2o', formula: 'H₂O', name: 'Water', state: 'liquid', color: 'rgba(59, 130, 246, 0.1)' },
  { id: 'hcl', formula: 'HCl', name: 'Hydrochloric Acid', state: 'liquid', color: 'rgba(255, 255, 255, 0.1)' },
  { id: 'naoh', formula: 'NaOH', name: 'Sodium Hydroxide', state: 'liquid', color: 'rgba(255, 255, 255, 0.1)' },
  { id: 'h2so4', formula: 'H₂SO₄', name: 'Sulfuric Acid', state: 'liquid', color: 'rgba(255, 255, 255, 0.1)' },
  { id: 'hno3', formula: 'HNO₃', name: 'Nitric Acid', state: 'liquid', color: 'rgba(251, 191, 36, 0.2)' },
  { id: 'n2', formula: 'N₂', name: 'Nitrogen', state: 'gas', color: 'transparent' },
  { id: 'h2', formula: 'H₂', name: 'Hydrogen', state: 'gas', color: 'transparent' },
  { id: 'o2', formula: 'O₂', name: 'Oxygen', state: 'gas', color: 'transparent' },
  { id: 'cl2', formula: 'Cl₂', name: 'Chlorine', state: 'gas', color: 'rgba(234, 255, 208, 0.2)' },
  { id: 'nh3', formula: 'NH₃', name: 'Ammonia', state: 'gas', color: 'transparent' },
  { id: 'na', formula: 'Na', name: 'Sodium', state: 'solid', color: '#e2e8f0' },
  { id: 'al', formula: 'Al', name: 'Aluminium', state: 'solid', color: '#94a3b8' },
  { id: 'zn', formula: 'Zn', name: 'Zinc', state: 'solid', color: '#71717a' },
  { id: 'kmno4', formula: 'KMnO₄', name: 'Potassium Permanganate', state: 'liquid', color: '#701a75' },
  { id: 'k2cr2o7', formula: 'K₂Cr₂O₇', name: 'Potassium Dichromate', state: 'liquid', color: '#ea580c' },
  { id: 'fecl3', formula: 'FeCl₃', name: 'Ferric Chloride', state: 'liquid', color: '#b45309' },
  { id: 'cucl2', formula: 'CuCl₂', name: 'Cupric Chloride', state: 'liquid', color: '#0284c7' },
  { id: 'agno3', formula: 'AgNO₃', name: 'Silver Nitrate', state: 'liquid', color: '#e2e8f0' },
  { id: 'fe2o3', formula: 'Fe₂O₃', name: 'Iron(III) Oxide', state: 'solid', color: '#991b1b' },

  // -- Active Organic Reactants --
  { id: 'c2h5oh', formula: 'C₂H₅OH', name: 'Ethanol', state: 'liquid', color: 'rgba(255, 255, 255, 0.1)' },
  { id: 'ch3cho', formula: 'CH₃CHO', name: 'Acetaldehyde', state: 'liquid', color: 'rgba(255, 255, 255, 0.1)' },
  { id: 'ch3coch3', formula: 'CH₃COCH₃', name: 'Acetone', state: 'liquid', color: 'rgba(255, 255, 255, 0.15)' },
  { id: 'c6h5oh', formula: 'C₆H₅OH', name: 'Phenol', state: 'liquid', color: 'rgba(255, 255, 255, 0.2)' },
  { id: 'c6h5nh2', formula: 'C₆H₅NH₂', name: 'Aniline', state: 'liquid', color: 'rgba(245, 158, 11, 0.1)' },
  { id: 'ch3cl', formula: 'CH₃Cl', name: 'Chloromethane', state: 'gas', color: 'transparent' },
  { id: 'i2', formula: 'I₂', name: 'Iodine Solution', state: 'liquid', color: '#92400e' },
  { id: 'br2', formula: 'Br₂', name: 'Bromine Water', state: 'liquid', color: '#9a3412' }
];

export const reactionDataset = [
  {
    id: 'electro_01',
    name: 'Electrolysis of Water',
    type: 'Electrolysis',
    reactants: ['h2o'],
    products: ['h2', 'o2'],
    observations: { visual: 'Bubbles of H₂ and O₂ gases form at the electrodes.', color: 'rgba(59, 130, 246, 0.2)', animation: 'bubbles' },
    equation: '2H₂O → 2H₂ + O₂',
    description: 'Decomposition of water into hydrogen and oxygen gases using electric current.'
  },
  {
    id: 'electro_02',
    name: 'Daniel Cell Reaction',
    type: 'Redox',
    reactants: ['zn', 'cucl2'],
    products: ['cu', 'zncl2'],
    observations: { visual: 'Blue color fades, reddish-brown copper deposits.', color: '#0284c7', animation: 'color_shift' },
    equation: 'Zn + CuSO₄ → ZnSO₄ + Cu',
    description: 'Electrochemical reaction where Zinc displaces Copper.'
  },
  {
    id: 'metal_01',
    name: 'Thermite Reaction',
    type: 'Exothermic',
    reactants: ['al', 'fe2o3'],
    products: ['al2o3', 'fe'],
    observations: { visual: 'Intense heat and bright light emitted.', color: '#ef4444', animation: 'flash' },
    equation: '2Al + Fe₂O₃ → Al₂O₃ + 2Fe',
    description: 'Highly exothermic reaction used for welding railway tracks.'
  },
  {
    id: 'pblock_01',
    name: 'Haber Process',
    type: 'Industrial',
    reactants: ['n2', 'h2'],
    products: ['nh3'],
    observations: { visual: 'No visual change, occurs under high pressure.', color: 'rgba(255, 255, 255, 0.1)', animation: 'heat' },
    equation: 'N₂ + 3H₂ ⇌ 2NH₃',
    description: 'Industrial synthesis of ammonia from nitrogen and hydrogen gases.'
  },
  {
    id: 'pblock_02',
    name: 'Ostwald Process (Step 1)',
    type: 'Oxidation',
    reactants: ['nh3', 'o2'],
    products: ['no', 'h2o'],
    observations: { visual: 'Colorless gas formed over platinum gauge.', color: 'rgba(255, 255, 255, 0.1)', animation: 'smoke' },
    equation: '4NH₃ + 5O₂ → 4NO + 6H₂O',
    description: 'Catalytic oxidation of ammonia to nitric oxide.'
  },
  {
    id: 'pblock_10',
    name: 'Chlorine with Cold Dilute NaOH',
    type: 'Disproportionation',
    reactants: ['cl2', 'naoh'],
    products: ['nacl', 'naocl'],
    observations: { visual: 'Yellowish-green gas disappears into solution.', color: '#fef9c3', animation: 'color_shift' },
    equation: 'Cl₂ + 2NaOH → NaCl + NaOCl + H₂O',
    description: 'Chlorine reacts with cold dilute base to form bleach.'
  },
  {
    id: 'dblock_01',
    name: 'KMnO₄ Reduction (Acidic)',
    type: 'Redox',
    reactants: ['kmno4', 'h2so4'],
    products: ['mnso4', 'h2o'],
    observations: { visual: 'Deep purple color disappears (decolorization).', color: 'rgba(255, 255, 255, 0.1)', animation: 'color_shift' },
    equation: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O',
    description: 'Purple potassium permanganate is reduced to colorless Mn²⁺ in acidic medium.'
  },
  {
    id: 'dblock_04',
    name: 'Dichromate–Chromate Equilibrium',
    type: 'Equilibrium',
    reactants: ['k2cr2o7', 'naoh'],
    products: ['k2cro4', 'h2o'],
    observations: { visual: 'Orange solution turns Yellow.', color: '#facc15', animation: 'color_shift' },
    equation: 'Cr₂O₇²⁻ + 2OH⁻ ⇌ 2CrO₄²⁻ + H₂O',
    description: 'Equilibrium shift between orange dichromate and yellow chromate ions.'
  },
  {
    id: 'halo_01',
    name: 'Haloalkane Hydrolysis',
    type: 'Substitution',
    reactants: ['ch3cl', 'naoh'],
    products: ['ch3oh', 'nacl'],
    observations: { visual: 'Solution remains clear.', color: 'rgba(255, 255, 255, 0.1)', animation: 'heat' },
    equation: 'CH₃Cl + NaOH(aq) → CH₃OH + NaCl',
    description: 'Nucleophilic substitution of chlorine by hydroxyl group.'
  },
  {
    id: 'halo_07',
    name: 'Wurtz Reaction',
    type: 'Coupling',
    reactants: ['ch3cl', 'na'],
    products: ['c2h6', 'nacl'],
    observations: { visual: 'Bubbles of ethane gas evolve.', color: 'rgba(255, 255, 255, 0.3)', animation: 'bubbles' },
    equation: '2CH₃Cl + 2Na → C₂H₆ + 2NaCl',
    description: 'Coupling of alkyl halides using sodium metal in dry ether.'
  },
  {
    id: 'alco_06',
    name: 'Ferric Chloride Test',
    type: 'Complexation',
    reactants: ['c6h5oh', 'fecl3'],
    products: ['fe_phen'],
    observations: { visual: 'Appearance of a deep violet/purple coloration.', color: '#7e22ce', animation: 'color_shift' },
    equation: 'C₆H₅OH + FeCl₃ → Violet Complex',
    description: 'Identification test for phenol using neutral ferric chloride.'
  },
  {
    id: 'aldket_02',
    name: 'Tollen\'s Test',
    type: 'Organic Test',
    reactants: ['ch3cho', 'agno3'],
    products: ['ag'],
    observations: { visual: 'A shining silver mirror forms on the vessel walls.', color: '#cbd5e1', animation: 'precipitate' },
    equation: 'RCHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → RCOO⁻ + 2Ag↓',
    description: 'Aldehydes reduce Tollen\'s reagent to metallic silver.'
  },
  {
    id: 'aldket_08',
    name: 'Iodoform Reaction',
    type: 'Organic Test',
    reactants: ['ch3coch3', 'i2', 'naoh'],
    products: ['chcl3'],
    observations: { visual: 'Yellow precipitate of Iodoform forms.', color: '#fef08a', animation: 'precipitate' },
    equation: 'CH₃COCH₃ + 3I₂ + 4NaOH → CHI₃↓ + CH₃COONa',
    description: 'Test for methyl ketones producing yellow iodoform.'
  },
  {
    id: 'amine_02',
    name: 'Hofmann Bromamide Degradation',
    type: 'Degradation',
    reactants: ['nh3', 'br2', 'naoh'],
    products: ['ch3nh2'],
    observations: { visual: 'Evolution of gas and characteristic amine smell.', color: 'rgba(255, 255, 255, 0.2)', animation: 'bubbles' },
    equation: 'RCONH₂ + Br₂ + 4NaOH → RNH₂ + Na₂CO₃',
    description: 'Conversion of an amide to a primary amine with one fewer carbon atom.'
  },
  {
    id: 'amine_03',
    name: 'Diazotization',
    type: 'Diazotization',
    reactants: ['c6h5nh2', 'hno3', 'hcl'],
    products: ['diazo'],
    observations: { visual: 'Solution remains clear, must be kept ice-cold.', color: 'rgba(59, 130, 246, 0.1)', animation: 'heat' },
    equation: 'C₆H₅NH₂ + NaNO₂ + HCl → C₆H₅N₂⁺Cl⁻',
    description: 'Formation of diazonium salts from primary aromatic amines.'
  }
];
