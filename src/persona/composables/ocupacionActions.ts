import { sttp } from 'src/boot/sttp';
import { IOcupacion } from 'src/core/models';
import { IResponse, NotifyUtils } from 'src/core/utils';

export function useOcupationActions() {
  const saveOcupacion = async (data: IOcupacion) => {
    await sttp
      .post<IResponse<IOcupacion>>('/ocupacion/create', data)
      .then((response) => {
        if (response.isSuccess()) {
          NotifyUtils.success({ message: 'Ocupacion guardada correctamente' });
        }
        return response;
      });
  };

  return {
    saveOcupacion,
  };
}
