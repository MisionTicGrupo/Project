$(window).on('load', function() {

    $("#btnNuevo").on("click", function() {
        $(".modal-header").css("background-color", "#198754")
        $(".modal-title").text("Nuevo Registro").css("color", "white")
        
        clearModal();

        $("#modal1").modal("show")
    });

    $('body').on("click", "#btnEditar", function (e) {
        $(".modal-header").css("background-color", "#0d6efd")
        $(".modal-title").text("Editar Registro").css("color", "white")

        var parent = $(this).parent().parent().parent().parent();

        $.post( 'data', { csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value, id: parent.find("#idValue").text() } )
            .done(function( data ) {
                console.log($('input[name="idV"]').text())
                $('input[name="idV"]').val(parent.find("#idValue").text());
                $('#viewImage').attr("src", `/imagenes/${data.image}`).attr("width", "120");
                $('input[name="imagen"]').attr("value", `/imagenes/${data.image}`)
                $('input[name="nombre"]').val(data.nombre);
                $('input[name="descripcion"]').val(data.desc);
                $('input[name="precio"]').val(data.precio);
                $('input[name="stock"]').val(data.stock);
            });

        $("#modal1").modal("show")
    });

    $("#btnGuardar").on("click", function(e) {
        if($('input[name="nombre"]').val() == "") {
            $("#alertDiv").html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Nombre del producto</strong> es un campo requerido.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`)
            return;
        } else if($('input[name="descripcion"]').val() == "") {
            $("#alertDiv").html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Descripcion del producto</strong> es un campo requerido.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`)
            return;
        } else if($('input[name="imagen"]').val() == "" && $('input[name="imagen"]').attr("value") == "") {
            $("#alertDiv").html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Imagen del producto</strong> es un campo requerido.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`)
            return;
        } else if($('input[name="precio"]').val() == "") {
            $("#alertDiv").html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Precio del producto</strong> es un campo requerido.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`)
            return;
        } else if($('input[name="stock"]').val() == "") {
            $("#alertDiv").html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Cantidad del producto</strong> es un campo requerido.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`)
            return;
        }

        else if($(".modal-title").text().startsWith("Editar")) {
            e.preventDefault();
            $('#formProductos').attr('action', "/admin/edit").submit();
        } else if($(".modal-title").text().startsWith("Nuevo")) {
            e.preventDefault();
            $('#formProductos').attr('action', "/admin/create").submit();
        }
    });

});

function clearModal() {
    $('#viewImage').attr("width", "0");
    $('input[name="nombre"]').val("");
    $('input[name="descripcion"]').val("");
    $('input[name="precio"]').val("");
    $('input[name="stock"]').val("");
}

/*
if($(".modal-title").text().startsWith("Nuevo")) {
            console.log("asd")
            e.preventDefault();
            $('#formProductos').attr('action', "/admin/create").submit();
        } else*/