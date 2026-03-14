export type StepDocumentation = {
  title: string;
  explanation: string;
  logic: string;
  prerequisites?: PrerequisiteProp[];
  mnemonic?: string;
};

export type PrerequisiteProp = {
  id: number;
  prereqId: string;
  value: string;
};

export const bubbleSortDocs: Record<string, StepDocumentation> = {
  step1: {
    title: "Pas 1 – Comparare și swap",
    explanation:
      "Comparam primul și al doilea element. Dacă primul e mai mare decât al doilea, facem swap.",
    logic:
      "Bubble Sort mută elementele mari spre finalul array-ului, comparând perechi vecine.",
    prerequisites: [
      { id: 0, prereqId: "array_doc", value: "Ce e un array" },
      { id: 1, prereqId: "swap_doc", value: "Ce e swap" },
      { id: 2, prereqId: "concept_compare_doc", value: "Concept de comparare" },
    ],
    mnemonic: "Imaginează-ți că bulele mari urcă la suprafață.",
  },
  step2: {
    title: "Pas 2 – Comparare fără swap",
    explanation: "Comparăm 5 și 8. 5 < 8, deci nu facem swap.",
    logic:
      "Dacă elementul curent e mai mic decât următorul, îl lăsăm la locul lui.",
    prerequisites: [
      {
        id: 0,
        prereqId: "compare_elements_doc",
        value: "Comparare elemente adiacente",
      },
    ],
    mnemonic: "Bula mică rămâne jos.",
  },
  step3: {
    title: "Pas 3 – Comparare fără swap",
    explanation: "Comparăm 5 și 8. 5 < 8, deci nu facem swap.",
    logic:
      "Dacă elementul curent e mai mic decât următorul, îl lăsăm la locul lui.",
    prerequisites: [
      { id: 0, prereqId: "comp_doc", value: "Comparare elemente adiacente" },
    ],
    mnemonic: "Bula mică rămâne jos.",
  },
  // ... restul documentației
};
