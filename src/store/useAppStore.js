import { create } from "zustand";

const ADJECTIVES = ["Neon", "Swift", "Happy", "Cyber", "Lazy"];
const ANIMALS = ["Tiger", "Fox", "Panda", "Eagle", "Owl"];
const COLORS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

const useAppStore = create((set) => ({
  currentUser: null,
  targetImageId: null,

  setTargetImageId: (id) => set({ targetImageId: id }),

  initUser: () => {
    const stored = localStorage.getItem("fotoowl_user");

    if (stored) {
      set({ currentUser: JSON.parse(stored) });
    } else {
      const randomAdj =
        ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
      const randomAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

      const newUser = {
        id: Date.now().toString(),
        name: `${randomAdj} ${randomAnimal}`,
        color: randomColor,
      };

      localStorage.setItem("fotoowl_user", JSON.stringify(newUser));
      set({ currentUser: newUser });
    }
  },
}));

export default useAppStore;
