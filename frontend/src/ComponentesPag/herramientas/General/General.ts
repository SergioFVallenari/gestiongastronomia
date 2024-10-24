import { Loading, Report, Confirm } from 'notiflix';

const DonFaustinoGeneral = {
    DonFaustinoLoad(accion: boolean) {
      accion ? Loading.circle() : Loading.remove();
    },
    VerificarDivisibilidad(numero: number): number {
      if (numero >= 1 && numero <= 6) {
        return numero;
      } else if (numero >= 7) {
        return 6;
      } else return 0;
    },
    tamanio_modal_tablero(chequeosObservados: any[], tipo: number): string | undefined {
      const columnCount: number = DonFaustinoGeneral.VerificarDivisibilidad(chequeosObservados.length);
      if (tipo === 4) return 'md';
      else if (tipo === 6) return 'xl';
      else if (tipo === 2) return 'xl';
      else if (tipo === 7) return 'lg';
      else {
        if (columnCount >= 5) {
          return 'xl';
        } else if (columnCount > 3) {
          return 'lg';
        } else if (columnCount <= 2) {
          return 'md';
        } else {
          return undefined;
        }
      }
    },
  };
  export const EnviarMensaje = (tipo: string, msg: string): void => {
    if (msg === undefined) {
      msg = '';
    }
    switch (tipo) {
      case 'success':
        Report.success('Registro Exitoso', msg, 'Cerrar');
        break;
      case 'danger':
        Report.failure('Ups, tenemos un problema', msg, 'Cerrar');
        break;
      case 'warning':
        Report.warning('Atencion!', msg, 'Cerrar');
        break;
    }
  };
  export const ConfirmGeneral = (title: string, description: string, functionConfirm: Function = () => {}, idorden: number, functionDecline: Function = () => {}): void => {
    Confirm.show(
      title,
      description,
      'Si',
      'No',
      () => functionConfirm(idorden),
      () => functionDecline
    );
  };

  export default DonFaustinoGeneral;