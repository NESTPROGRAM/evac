<?php

if (isset($_REQUEST['report'])) {
    $filename = "reports/" . makeFilename();
    
    file_put_contents($filename, json_encode($_REQUEST['report']));

    echo '{"success": true, "filename":"' . $filename .'"}';
}
else {
    echo '{"success": false}';
}
                              
function makeFilename() {
    $filename = "report_" . $_REQUEST['report']['name'] . '_' . time() . ".json";
    
    $filename = mb_ereg_replace("([^\w\s\d\-_~,;\[\]\(\).])", '', $filename);
    $filename = mb_ereg_replace("([\.]{2,})", '', $filename);
    
    return $filename;       
}
?>
