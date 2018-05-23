<?php

$reportFile = $_REQUEST['reportFile'];

header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=" . $reportFile);
header("Pragma: no-cache");
header("Expires: 0");


echo file_get_contents("reports_csv/" . $reportFile);

?>
