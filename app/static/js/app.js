$(document).ready(function(){
    namespace = '/test'; // change to an empty string to use the global namespace

    // the socket.io documentation recommends sending an explicit package upon connection
    // this is specially important when using the global namespace
    var socket = io.connect(location.protocol+'//' + document.domain + ':' + location.port + namespace);

    // event handler for server sent data
    // the data is displayed in the "Received" section of the page
    socket.on('my connected', function(msg) {
        avail = $("tr[id*='trs_'] td:contains(available)").length;
        occupied= $("tr[id*='trs_'] td:contains(occupied)").length;
        $('#log').html(msg.data);
        $('#avail').html('Available: '+ avail + ',' + 'Occupied: ' + occupied);

        f1_avail = $("tr[id*='trs_F1_'] td:contains(available)").length;
        f1_occ = $("tr[id*='trs_F1_'] td:contains(occupied)").length;
        $('#F1_avail').html(f1_avail);
        $('#F1_occ').html(f1_occ);

        f2_avail = $("tr[id*='trs_F2_'] td:contains(available)").length;
        f2_occ = $("tr[id*='trs_F2_'] td:contains(occupied)").length;
        $('#F2_avail').html(f2_avail);
        $('#F2_occ').html(f2_occ);

        f3_avail = $("tr[id*='trs_F3_'] td:contains(available)").length;
        f3_occ = $("tr[id*='trs_F3_'] td:contains(occupied)").length;
        $('#F3_avail').html(f1_avail);
        $('#F3_occ').html(f1_occ);

        f4_avail = $("tr[id*='trs_F4_'] td:contains(available)").length;
        f4_occ = $("tr[id*='trs_F4_'] td:contains(occupied)").length;
        $('#F4_avail').html(f1_avail);
        $('#F4_occ').html(f1_occ);
    });

    socket.on('my response', function(msg) {
        $('#log').html('<br>[Board1,Board2,Board3]#<br>' + '[' +msg.board_1+ ',' +msg.board_2+ ',' +msg.board_3+ ']' + ':<br> ' +msg.data).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0);});
    });

    socket.on('carpark response', function(msg) {
        if(msg.avail == 'available') {
            $('#tr_'+msg.floor).html('<td>'+msg.floor+'</td>'+'<td bgcolor="#B6E806">'+msg.avail+'</td>'+'<td>'+msg.last_update+'</td>').fadeTo(100, 0.3, function() { $(this).fadeTo(300, 1.0);});
            $('#trs_'+msg.floor).html('<td>'+msg.floor+'</td>'+'<td bgcolor="#B6E806">'+msg.avail+'</td>'+'<td>'+msg.last_update+'</td>').fadeTo(100, 0.3, function() { $(this).fadeTo(300, 1.0);});
        } else {
            $('#tr_'+msg.floor).html('<td>'+msg.floor+'</td>'+'<td bgcolor="#FA7268">'+msg.avail+'</td>'+'<td>'+msg.last_update+'</td>').fadeTo(100, 0.3, function() { $(this).fadeTo(300, 1.0);});
            $('#trs_'+msg.floor).html('<td>'+msg.floor+'</td>'+'<td bgcolor="#FA7268">'+msg.avail+'</td>'+'<td>'+msg.last_update+'</td>').fadeTo(100, 0.3, function() { $(this).fadeTo(300, 1.0);});
        }

        avail = $("tr[id*='trs_'] td:contains(available)").length;
        occupied= $("tr[id*='trs_'] td:contains(occupied)").length;
        $('#avail').html('Available: '+ avail + ',' + 'Occupied: ' + occupied);

        f1_avail = $("tr[id*='trs_F1_'] td:contains(available)").length;
        f1_occ = $("tr[id*='trs_F1_'] td:contains(occupied)").length;
        $('#F1_avail').html(f1_avail);
        $('#F1_occ').html(f1_occ);

        f2_avail = $("tr[id*='trs_F2_'] td:contains(available)").length;
        f2_occ = $("tr[id*='trs_F2_'] td:contains(occupied)").length;
        $('#F2_avail').html(f2_avail);
        $('#F2_occ').html(f2_occ);

        f3_avail = $("tr[id*='trs_F3_'] td:contains(available)").length;
        f3_occ = $("tr[id*='trs_F3_'] td:contains(occupied)").length;
        $('#F3_avail').html(f1_avail);
        $('#F3_occ').html(f1_occ);

        f4_avail = $("tr[id*='trs_F4_'] td:contains(available)").length;
        f4_occ = $("tr[id*='trs_F4_'] td:contains(occupied)").length;
        $('#F4_avail').html(f1_avail);
        $('#F4_occ').html(f1_occ);
    });

    // event handler for new connections
    socket.on('connect', function() {
        socket.emit('my event', {data: 'Connected!'});
    });

    // handlers for the different forms in the page
    // these send data to the server in a variety of ways
    $('form#emit').submit(function(event) {
        socket.emit('my event', {data: $('#emit_data').val()});
        return false;
    });
    $('form#broadcast').submit(function(event) {
        socket.emit('my broadcast event', {data: $('#broadcast_data').val()});
        return false;
    });
    $('form#join').submit(function(event) {
        socket.emit('join', {room: $('#join_room').val()});
        return false;
    });
    $('form#leave').submit(function(event) {
        socket.emit('leave', {room: $('#leave_room').val()});
        return false;
    });
    $('form#send_room').submit(function(event) {
        socket.emit('my room event', {room: $('#room_name').val(), data: $('#room_data').val()});
        return false;
    });
    $('form#close').submit(function(event) {
        socket.emit('close room', {room: $('#close_room').val()});
        return false;
    });
    $('form#disconnect').submit(function(event) {
        socket.emit('disconnect request');
        return false;
    });
});
