import create from 'zustand';

interface LiquidityState {
	liquidity: Array<number>;
	updateLiquidity: (newValues: Array<number>) => void;
}

export const useLiquidityStore = create<LiquidityState>((set) => ({
	liquidity: [],
	updateLiquidity: (newValues) =>
		set((state) => ({ liquidity: [...state.liquidity, ...newValues].sort((a, b) => a - b) }))
}));
