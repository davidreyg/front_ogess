import { sttp } from 'src/boot/sttp';
import { IEstadoCivil, IOcupacion } from 'src/core/models';
import { IQSelectOptions, IResponse } from 'src/core/utils';
import { onMounted, ref } from 'vue';

export function useInitialPersonaData() {
  const ocupaciones = ref<Array<IQSelectOptions>>([]);
  const estados_civiles = ref<Array<IQSelectOptions>>([]);

  const fetchOcupaciones = async () => {
    await sttp
      .get<IResponse<IOcupacion[]>>('/ocupacion/list')
      .then((response) => {
        ocupaciones.value = [];
        response.data().data.map(({ id, ocup_nombre }) => {
          ocupaciones.value.push({ label: ocup_nombre, value: id });
        });
        return response;
      });
  };
  const fetchEstadosCiviles = async () => {
    await sttp
      .get<IResponse<IEstadoCivil[]>>('/estado-civil/list')
      .then((response) => {
        response.data().data.map(({ id, esci_nombre }) => {
          estados_civiles.value.push({ label: esci_nombre, value: id });
        });
        return response;
      });
  };

  onMounted(async () => {
    await fetchOcupaciones();
    await fetchEstadosCiviles();
  });
  return {
    ocupaciones,
    estados_civiles,
    fetchEstadosCiviles,
    fetchOcupaciones,
  };
}
