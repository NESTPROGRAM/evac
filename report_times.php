<?php

header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=report_times.csv");
header("Pragma: no-cache");
header("Expires: 0");

echo "Participant ID,Attempt #1 Duration,Attempt #2 Duration\n";

$reportFiles = scandir("reports/");

foreach ($reportFiles as $reportFile)
{
    if ($reportFile != "." && $reportFile != "..")
    {
        $string = file_get_contents("reports/" . $reportFile);
        $json = json_decode($string, true);
        
        echo $json['name'] . "," . $json['attempt1_duration'] . "," . $json['attempt2_duration'] . "\n";
    }
}
?>