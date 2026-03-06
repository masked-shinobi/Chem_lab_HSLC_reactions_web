export const reactionDataset = [
  {
    id: "reac_001",
    name: "Precipitation of Silver Chloride",
    reactants: ["AgNO3", "NaCl"],
    products: ["AgCl", "NaNO3"],
    type: "Precipitation",
    observations: {
      visual: "A dense white precipitate forms immediately.",
      color: "#ffffff",
      animation: "precipitate"
    },
    equation: "AgNO3 + NaCl → AgCl↓ + NaNO3",
    description: "When silver nitrate reacts with sodium chloride, an insoluble white precipitate of silver chloride is formed."
  },
  {
    id: "reac_002",
    name: "Neutralization",
    reactants: ["HCl", "NaOH"],
    products: ["NaCl", "H2O"],
    type: "Neutralization",
    observations: {
      visual: "The solution remains clear but releases heat.",
      color: "rgba(255, 255, 255, 0.2)",
      animation: "heat"
    },
    equation: "HCl + NaOH → NaCl + H2O",
    description: "The classic reaction between a strong acid (hydrochloric acid) and a strong base (sodium hydroxide) to form salt and water."
  },
  {
    id: "reac_003",
    name: "Copper Displacement",
    reactants: ["Fe", "CuSO4"],
    products: ["FeSO4", "Cu"],
    type: "Displacement",
    observations: {
      visual: "Blue solution turns pale green, brown coating on iron.",
      color: "#4ade80",
      animation: "color_shift"
    },
    equation: "Fe + CuSO4 → FeSO4 + Cu",
    description: "Iron displaces copper from copper sulfate solution because iron is more reactive than copper."
  },
  {
    id: "reac_004",
    name: "Magnesium Combustion",
    reactants: ["Mg", "O2"],
    products: ["MgO"],
    type: "Combustion",
    observations: {
      visual: "Dazzling white flame, white powder residue.",
      color: "#ffffff",
      animation: "flash"
    },
    equation: "2Mg + O2 → 2MgO",
    description: "Magnesium burns in oxygen with an intense white light to produce magnesium oxide."
  },
  {
    id: "reac_005",
    name: "Decomposition of Potassium Chlorate",
    reactants: ["KClO3"],
    products: ["KCl", "O2"],
    type: "Decomposition",
    observations: {
      visual: "Rapid evolution of oxygen gas bubbles.",
      color: "rgba(255, 255, 255, 0.5)",
      animation: "bubbles"
    },
    equation: "2KClO3 → 2KCl + 3O2↑",
    description: "Heating potassium chlorate in the presence of MnO2 catalyst releases oxygen gas."
  },
  {
    id: "reac_006",
    name: "Lead Nitrate and Potassium Iodide",
    reactants: ["Pb(NO3)2", "KI"],
    products: ["PbI2", "KNO3"],
    type: "Precipitation",
    observations: {
      visual: "Brilliant yellow precipitate forms.",
      color: "#facc15",
      animation: "precipitate"
    },
    equation: "Pb(NO3)2 + 2KI → PbI2↓ + 2KNO3",
    description: "A beautiful precipitation reaction forming yellow lead(II) iodide."
  },
  {
    id: "reac_007",
    name: "Zinc and Sulfuric Acid",
    reactants: ["Zn", "H2SO4"],
    products: ["ZnSO4", "H2"],
    type: "Redox",
    observations: {
      visual: "Effervescence (bubbles) of hydrogen gas.",
      color: "rgba(255, 255, 255, 0.3)",
      animation: "bubbles"
    },
    equation: "Zn + H2SO4 → ZnSO4 + H2↑",
    description: "Zinc reacts with dilute sulfuric acid to liberate hydrogen gas."
  },
  {
    id: "reac_008",
    name: "Ammonia and Hydrogen Chloride",
    reactants: ["NH3", "HCl"],
    products: ["NH4Cl"],
    type: "Composition",
    observations: {
      visual: "Dense white fumes/smoke.",
      color: "#f1f5f9",
      animation: "smoke"
    },
    equation: "NH3(g) + HCl(g) → NH4Cl(s)",
    description: "Gaseous ammonia and hydrogen chloride react to form solid ammonium chloride 'smoke'."
  }
];

export const chemicals = [
  { id: "NaCl", name: "Sodium Chloride", formula: "NaCl", state: "solid", color: "#f8fafc" },
  { id: "AgNO3", name: "Silver Nitrate", formula: "AgNO3", state: "liquid", color: "#e2e8f0" },
  { id: "HCl", name: "Hydrochloric Acid", formula: "HCl", state: "liquid", color: "rgba(255, 255, 255, 0.1)" },
  { id: "NaOH", name: "Sodium Hydroxide", formula: "NaOH", state: "liquid", color: "rgba(255, 255, 255, 0.1)" },
  { id: "Fe", name: "Iron Filings", formula: "Fe", state: "solid", color: "#64748b" },
  { id: "CuSO4", name: "Copper(II) Sulfate", formula: "CuSO4", state: "liquid", color: "#3b82f6" },
  { id: "Mg", name: "Magnesium Ribbon", formula: "Mg", state: "solid", color: "#94a3b8" },
  { id: "O2", name: "Oxygen", formula: "O2", state: "gas", color: "transparent" },
  { id: "KClO3", name: "Potassium Chlorate", formula: "KClO3", state: "solid", color: "#f1f5f9" },
  { id: "Pb(NO3)2", name: "Lead(II) Nitrate", formula: "Pb(NO3)2", state: "liquid", color: "#f1f5f9" },
  { id: "KI", name: "Potassium Iodide", formula: "KI", state: "liquid", color: "#fef08a" },
  { id: "Zn", name: "Zinc Granules", formula: "Zn", state: "solid", color: "#71717a" },
  { id: "H2SO4", name: "Sulfuric Acid", formula: "H2SO4", state: "liquid", color: "rgba(255, 255, 255, 0.1)" },
  { id: "NH3", name: "Ammonia", formula: "NH3", state: "gas", color: "transparent" }
];
