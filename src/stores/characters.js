import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import useMarvelService from '@/composables/MarvelService';

export const useCharactersStore = defineStore('characters', () => {
  const characters = ref([]);
  const offset = ref(0);
  const charEnded = ref(false);
  const selectedCharacterId = ref(null);
  const characterDetails = ref({});
  const newItemLoading = ref(false);
  const charInfoLoading = ref(false);

  const { loading, error, getAllCharacters, getCharacter, clearServiceError } = useMarvelService();

  const selectedCharacter = computed(() => {
    return selectedCharacterId.value ? characterDetails.value[selectedCharacterId.value] : null;
  });

  const loadCharacters = async () => {
    newItemLoading.value = true;
    const newCharList = await getAllCharacters(offset.value);

    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    characters.value = [...characters.value, ...newCharList];
    offset.value += 9;
    charEnded.value = ended;

    newItemLoading.value = false;

    return newCharList;
  };

  const selectCharacter = async (charId) => {
    charInfoLoading.value = true;
    selectedCharacterId.value = charId;

    // Проверка кэша
    if (characterDetails.value[charId]) {
      charInfoLoading.value = false;
      return characterDetails.value[charId];
    }

    // Загрузка если нет в кэше
    clearServiceError();
    const char = await getCharacter(charId);
    characterDetails.value[charId] = char;

    charInfoLoading.value = false;
    return char;
  };

  const resetCharacters = () => {
    characters.value = [];
    offset.value = 0;
    charEnded.value = false;
  };




  return {
    // State
    characters,
    selectedCharacterId,
    selectedCharacter,
    characterDetails,
    offset,
    charEnded,
    charInfoLoading,
    loading,
    error,
    newItemLoading,

    // Actions
    loadCharacters,
    selectCharacter,
    resetCharacters,
    clearServiceError
  };
});
