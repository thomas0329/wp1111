// to do: set vars frequently used to global const

function remove_participant(id){
    var child = document.getElementById(id);
    child.parentNode.removeChild(child);
    var sidebar = document.getElementsByClassName("google-meet__others")[0];
    var main_window = document.getElementsByClassName("google-meet__anchored")[0];
    if(sidebar.childElementCount == 0){
        remove_sidebar();
    }
    if(main_window.childElementCount == 0){
        remove_main_window();
        if(sidebar.childElementCount == 1){
            main_window.appendChild(sidebar.firstElementChild);
            remove_sidebar();
        }
    }
}

function remove_main_window(){
    var sidebar = document.getElementsByClassName("google-meet__others")[0];
    sidebar.style.width = "100%";
    var anchored = document.getElementsByClassName("google-meet__anchored")[0];
    anchored.style.width = "0%";
}

function remove_sidebar(){
    var sidebar = document.getElementsByClassName("google-meet__others")[0];
    sidebar.style.width = "0%";
    var anchored = document.getElementsByClassName("google-meet__anchored")[0];
    anchored.style.width = "100%";
}

function reset_window(){
    var sidebar = document.getElementsByClassName("google-meet__others")[0];
    sidebar.style.width = "30%";
    var anchored = document.getElementsByClassName("google-meet__anchored")[0];
    anchored.style.width = "70%";
}

function main_to_side(main_participant_id){
    var main_participant = document.getElementById(main_participant_id);
    delete_pin(main_participant);
    var sidebar = document.getElementsByClassName("google-meet__others")[0];
    main_participant.parentNode.removeChild(main_participant);
    remove_main_window();
    sidebar.appendChild(main_participant);
}

function side_to_main(id){
    reset_window();
    var main_window = document.getElementsByClassName("google-meet__anchored")[0];
    var main_participant = document.getElementById(id);
    var anchored_name = main_participant.firstElementChild;
    main_window.appendChild(main_participant);
    set_pin();
}

function adjust_participants(id){
    var main_window = document.getElementsByClassName("google-meet__anchored")[0];
    if(main_window.childElementCount > 0){
        var main_participant = main_window.firstElementChild;
        if(main_participant.id == id){
            main_to_side(id);
        }
        else{
            switch_participants(id);
        }
    }
    else{
        side_to_main(id);
    }
}

function switch_participants(id){
    var anchored_participant = document.getElementsByClassName("google-meet__anchored")[0].firstElementChild;
    var another_participant = document.getElementById(id);
    var main_window = anchored_participant.parentNode;
    delete_pin(anchored_participant);
    another_participant.replaceWith(anchored_participant);
    main_window.appendChild(another_participant);
    set_pin();
}

function create_pin(pin_name){
    var pin = document.createElement("div");
    pin.className = "google-meet__pin";
    var pin_img = document.createElement("img");
    pin_img.setAttribute("src", "img/office-push-pin-modified.png");
    pin.appendChild(pin_img);
    pin.appendChild(pin_name);
    return pin;
}

function delete_pin(anchored_participant){
    var pin = anchored_participant.firstElementChild;
    var pin_name = pin.lastElementChild;
    anchored_participant.removeChild(pin);
    anchored_participant.prepend(pin_name);
}

function set_pin(){
    var main_window = document.getElementsByClassName("google-meet__anchored")[0];
    var main_participant = main_window.firstElementChild;
    var someone_is_anchored = Boolean(main_window.childElementCount);
    if(someone_is_anchored){
        let anchored_name = main_participant.firstElementChild;
        main_participant.removeChild(anchored_name);
        let pin = create_pin(anchored_name);
        main_participant.prepend(pin);
    }
}

set_pin();




