let selectedRow = null

/* Funcionalidad de botones */
$(document).ready(function () {
    $("#btnNuevo").click(function (){
        $(".modal-header").css("background-color", "#198754")
        $(".modal-title").text("Nuevo Registro").css("color", "white")
        $("#modal1").modal("show")
    })

$(".btnEditar").click(function (){
        $(".modal-header").css("background-color", "#0d6efd")
        $(".modal-title").text("Editar Registro").css("color", "white")
        $("#modal1").modal("show")
    })
   
    /*tinventario = $('#tinventario').DataTable({
    'language':{
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
    },
   });*/

});

/* Definición de variables */
const btnNuevo = document.getElementById("btnNuevo")
const form = document.querySelector("form")
let table = document.querySelector("tbody")
const modal = document.querySelector("#modal1")
let modalHeader = document.querySelector(".modal-header")
let modalTitle = document.querySelector(".modal-title")

/* Función Submit */
form.addEventListener("submit", function(e){
    e.preventDefault()
    onFormSubmit()
    
})

function onFormSubmit(){
    let formData = formDataRead()
    if (selectedRow == null){
        insertData(formData)
    }else{updateData(formData)}
        
    
resetForm()
alert("Registro exitoso")
}

function formDataRead(){
    let formData = {}
    formData["producto"] = document.querySelector("#producto").value
    formData["id"] = document.querySelector("#id").value
    formData["precio"] = document.querySelector("#precio").value
    formData["cantidad"] = document.querySelector("#cantidad").value
    return formData
}

function insertData(data){
    
    let newRow = table.insertRow(table.length)
    cell1 = newRow.insertCell(0)
    cell1.innerHTML = data.producto
    cell2 = newRow.insertCell(1)
    cell2.innerHTML = data.id
    cell3 = newRow.insertCell(2)
    cell3.innerHTML = data.precio
    cell4 = newRow.insertCell(3)
    cell4.innerHTML = data.cantidad
    cell5 = newRow.insertCell(4)
    cell5.innerHTML = `<td>
    <div class="text-center">
    <div class="btn-group">
        <button class="btn btn-primary btnEditar" onclick="onRowEdit(this)">Editar</button>
        <button class="btn btn-danger btnBorrar" onclick="onDelete(this)">Borrar</button>
    </div>
</div>
</td>`
}

function resetForm(){
    document.querySelector("#producto").value= ""
    document.querySelector("#id").value= ""
    document.querySelector("#precio").value= ""
    document.querySelector("#cantidad").value = ""
    selectedRow = null
}

function onRowEdit(td){
    selectedRow = td.parentElement.parentElement.parentElement.parentElement
    document.querySelector("#producto").value= selectedRow.cells[0].innerHTML
    document.querySelector("#id").value= selectedRow.cells[1].innerHTML
    document.querySelector("#precio").value= selectedRow.cells[2].innerHTML
    document.querySelector("#cantidad").value = selectedRow.cells[3].innerHTML
    openModal()
}

function onDelete(td){
    let row = td.parentElement.parentElement.parentElement.parentElement
    document.getElementById("tinventario").deleteRow(row.rowIndex)
}

function openModal(){
    $(".modal-header").css("background-color", "#0d6efd")
    $(".modal-title").text("Editar Registro").css("color", "white")
    $("#modal1").modal("show")
}

function updateData(formData){
    selectedRow.cells[0].innerHTML = formData.producto
    selectedRow.cells[1].innerHTML = formData.id
    selectedRow.cells[2].innerHTML = formData.precio
    selectedRow.cells[3].innerHTML = formData.cantidad
}
