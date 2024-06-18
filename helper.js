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
        if (id === 'almacenamiento') {
            if (input.value < 0) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">El almacenamiento no puede ser negativo</span>';
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

