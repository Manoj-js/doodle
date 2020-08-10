import Swal from 'sweetalert2';

export function errorsAlert(message: string, title?) {

  switch (message.includes(' 404 Not Found') || message.includes(' 0 Unknown Error')) {
    case true: {
      Swal.fire({
        icon: 'error',
        title: 'Something Went Wrong!!',
        text: 'Please try after sometime.',
      });
      break;
    }

    default: {
      Swal.fire({
        icon: 'error',
        title,
        text: message,
      });
      break;
    }
  }


}

export function successAlert(message: string, title?) {
  Swal.fire({
    icon: 'success',
    title,
    text: message,
  });
}
export function errorAlert(message: string, title?) {
  Swal.fire({
    icon: 'error',
    title,
    text: message,
  });
}



export function deleteAlert() {
  return Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });
}
export function infoAlert() {
  return Swal.fire({
    title: 'Do you want to accept this task?',
    text: '',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, accept it!'
  });
}
