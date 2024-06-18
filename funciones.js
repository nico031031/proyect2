import { eliminar, getData, obtener, save, update } from "./firebase.js"

let id = 0;
const verificar = (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);
    input.classList.remove('is-invalid');

    if (input.value.trim() === '') {
        input.classList.add('is-invalid');
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>';
    } else {
        input.classList.add('is-valid');
        div.innerHTML = '';
        if (id === 'precio') {
            if (input.value < 0) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">El precio no puede ser negativo</span>';
            }
        }
        if (id === 'fecha') {
            const dia = validarFecha(input.value);
            if (dia <= 0) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">La fecha debe ser anterior a hoy</span>';
            }
        }
        if (id === 'stock') {
            if (input.value < 0) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">El stock no puede ser negativo</span>';
            }
        }
    }
};
const limpiar = () => {
    document.querySelector('form').reset();
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
        document.getElementById(`e-${item.name}`).innerHTML = '';
    });
    document.getElementById('btnGuardar').value = 'Guardar';
};
const soloNumeros = (evt) => {
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode >= 48 && charCode <= 57) return true;
    return false;
};
const validarFecha = (fecha) => {
    const hoy = new Date();
    fecha = new Date(fecha);
    const resta = hoy - fecha;
    const dia = resta / (1000 * 60 * 60 * 24);
    return dia.toFixed(0);
};
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);
    });

    if (document.querySelectorAll('.is-invalid').length === 0) {
        const consola = {
            'nombre': document.getElementById('nombre').value.trim(),
            'modelo': document.getElementById('modelo').value,
            'fabricante': document.getElementById('fabricante').value.trim(),
            'fecha': document.getElementById('fecha').value,
            'precio': document.getElementById('precio').value,
            'almacenamiento': document.getElementById('almacenamiento').value,
            'stock': document.getElementById('stock').value
        };

        if (document.getElementById('btnGuardar').value === 'Guardar') {
            save(consola);
            limpiar();
        } else {
            update(id, consola);
            limpiar();
            id = 0;
        }
    }
});
window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = '';
        collection.forEach((doc) => {
            const item = doc.data();
            tabla += `<tr>
                <td>${item.nombre}</td>
                <td>${item.modelo}</td>
                <td>${item.fabricante}</td>
                <td>${item.fecha}</td>
                <td>${item.precio}</td>
                <td>${item.almacenamiento}</td>
                <td>${item.stock}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                </td>
            </tr>`;
        });
        document.getElementById('contenido').innerHTML = tabla;
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(btn.id);
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        });
                    }
                });
            });
        });
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await obtener(btn.id);
                const d = doc.data();
                document.getElementById('nombre').value = d.nombre;
                document.getElementById('modelo').value = d.modelo;
                document.getElementById('fabricante').value = d.fabricante;
                document.getElementById('fecha').value = d.fecha;
                document.getElementById('precio').value = d.precio;
                document.getElementById('almacenamiento').value = d.almacenamiento;
                document.getElementById('stock').value = d.stock;
                document.getElementById('btnGuardar').value = 'Modificar';
                id = btn.id;
            });
        });

    });
});
