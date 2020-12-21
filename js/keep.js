let details = "";
onStart = () => {
    $("#second").hide();
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/notes",
        dataType: "json",
        success: function (result) {
            console.log(result);
            $.each(result, function (key, tableValues) {
                details += `<div class="w3-panel w3-card-4 w3-yellow">
                <button id="delete" onclick="deleteCard(this)" name=${tableValues.id}>Delete</button>
                <h4>${tableValues.title}</h4>
                <p>${tableValues.description}</p></div>`
            })
            $('#potray').append(details);

        }
    });
};
$(document).ready(() => {
    $("#first").on('click', () => {
        $("#second").show();
        $("#first").hide();
    });
    $("#addNote").on('click', () => {
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/notes",
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify({
                "title": $('#title').val(),
                "description": $('#description').val(),
            })
        })
    });

    deleteCard = (event) => {
        console.log(event);
        var id = event.name;
        console.log("id nmbr",id);
        var myLink = `http://localhost:3000/notes/${id}`
        console.log(myLink);
        $.ajax({
            type: "DELETE",
            url: myLink,
            dataType: "json",
            success: function (result) {
                console.log(result);
            }
    })
}
});
