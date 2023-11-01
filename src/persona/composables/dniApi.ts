import { sttp } from 'src/boot/sttp';
import { NotifyUtils } from 'src/core/utils';
import { ref } from 'vue';

interface IReniecResponse {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export function useDniApi() {
  const reniecResponse = ref<IReniecResponse>({
    nombres: '',
    apellidoMaterno: '',
    apellidoPaterno: '',
  });
  const reniecLoading = ref(false);

  const fetchDniApi = async (dni: string) => {
    reniecLoading.value = true;
    await sttp.get<IReniecResponse>(`/apidni/${dni}`).then((response) => {
      if (response.data()) {
        reniecResponse.value = response.data();
        NotifyUtils.success({ message: 'Persona encontrada :)' });
      } else {
        NotifyUtils.warn({ message: 'No se encontro :(' });
        reniecResponse.value = {
          nombres: '',
          apellidoMaterno: '',
          apellidoPaterno: '',
        };
      }
      reniecLoading.value = false;
      return response;
    });
  };

  return {
    fetchDniApi,
    reniecResponse,
    reniecLoading,
  };
}
