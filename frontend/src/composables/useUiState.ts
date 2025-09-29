import { ref } from "vue";
import { UiState } from "@/enums/UiState";

export function useUiState<T>() {
    const state = ref<UiState>(UiState.Loading);
    const data = ref<T | null>(null);
    const error = ref<string | null>(null);

    const setLoading = () => {
        state.value = UiState.Loading;
        data.value = null;
        error.value = null;
    };

    const setData = (value: T) => {
        state.value = UiState.Data;
        data.value = value;
        error.value = null;
    };

    const setEmpty = () => {
        state.value = UiState.Empty;
        data.value = null;
        error.value = null;
    };

    const setFailure = (message: string) => {
        state.value = UiState.Failure;
        data.value = null;
        error.value = message;
    };

    return {
        state,
        data,
        error,
        setLoading,
        setData,
        setEmpty,
        setFailure,
    };
}