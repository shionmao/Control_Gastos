let listaNombresGastos = [];
let listaDescripcionGastos = [];
let listaValoresGastos = [];

/*Esta función se invoca al momento de que el usuario hace click en el
botón Agregar Gasto*/
function clickBoton(){
    
    let campoGasto = document.getElementById("valorGasto").value;

    //Condición que valida si el valor del gasto ingresado es mayor que $150, arroja un mensaje.
    if(campoGasto > 150){
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "El Gasto: "+campoGasto+" ingresado sobrepasa los $150",
            showConfirmButton: false,
            timer: 3000
        });                                      
    }

    agregarFilaAtabla();    
}

function agregarFilaAtabla() {
    
    let nombreGasto = document.getElementById("nombreGasto").value;
    let descripcionGasto = document.getElementById("descripcionGasto").value;
    let valorGasto = document.getElementById("valorGasto").value;

    if(nombreGasto == "" || descripcionGasto == "" || valorGasto == ""){
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Los Campos no deben de estar vacios",
            showConfirmButton: false,
            timer: 3000
        }); 
    }else{

    listaNombresGastos.push(nombreGasto);
    listaDescripcionGastos.push(descripcionGasto); 
    listaValoresGastos.push(valorGasto); 
    
    actualizarTabla();
    }
  }

function actualizarTabla(){

    const totalElementos = document.getElementById("totalGastos");
    //variable para guardar el total de gastos
    let totalGastos = 0;    
  
    // Obtener la tabla donde se insertarán los datos
    const tabla = document.getElementById('tablaGastos');

    let htmlLista = '';
    
    // Iterar sobre los campos y agregar las celdas
    listaNombresGastos.forEach((elemento,position) => {  
        
        const desGasto = listaDescripcionGastos[position]; 
        const valorGasto = Number(listaValoresGastos[position]);
                       
        htmlLista +=`<tr id="fila"> 
                        <td style="text-align: center;">
                            ${elemento}                                              
                        </td>
                        <td>
                            ${desGasto}                                              
                        </td>
                        <td style="text-align: center;">
                            ${valorGasto}                                              
                        </td>
                        <td style="text-align: center;">
                            <button class="btn btn-danger" title="Eliminar" onclick="eliminarGasto(${position})"><i class="fa-solid fa-trash"></i></button>
                            <button class="btn btn-warning" title="Editar" onclick="editarGasto(${position});"><i class="fa-solid fa-pen-to-square"></i></button>
                        </td>
                    </tr>`;
        totalGastos+=Number(valorGasto);
    });
    tabla.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos;
    limpiar();
}

function limpiar(){
   document.getElementById("nombreGasto").value = ""; 
   document.getElementById("descripcionGasto").value = ""; 
   document.getElementById("valorGasto").value = ""; 
}

function eliminarGasto(position){
    Swal.fire({
        title: "Eliminar Gasto?",
        text: "Desea usted eliminar el Gasto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
            listaNombresGastos.splice(position,1);
            listaDescripcionGastos.splice(position,1);
            listaValoresGastos.splice(position,1);
            actualizarTabla();
          Swal.fire({
            title: "Eliminado!",
            text: "El Gasto ha sido Eliminado",
            icon: "success"
          });
        }
      });    
}

function editarGasto(position){  

    let nombreGasto = listaNombresGastos[position];
    let valorGasto = listaValoresGastos[position];
    let descripcionGasto = listaDescripcionGastos[position];

    document.getElementById('nombreGasto').value = nombreGasto;
    document.getElementById('valorGasto').value = valorGasto;
    document.getElementById('descripcionGasto').value = descripcionGasto;

    document.getElementById('botonFormulario').innerHTML = 'Guardar Cambios';
    document.getElementById('botonFormulario').onclick = function() {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Datos guardados Exitosamente",
            showConfirmButton: false,
            timer: 3000
        });
        guardarCambios(position);
    };
}

function guardarCambios(position) {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    listaNombresGastos[position] = nombreGasto;
    listaValoresGastos[position] = valorGasto;
    listaDescripcionGastos[position] = descripcionGasto;

    actualizarTabla();
    limpiar();
    document.getElementById('botonFormulario').innerHTML = 'Agregar Gasto';
    document.getElementById('botonFormulario').onclick = function() {
        clickBoton();
    };
}
