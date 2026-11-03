import Swal from "sweetalert2";


export async function confirmAction({ title, text, confirmText }) {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#64748b",
  });
  return result.isConfirmed;
}
