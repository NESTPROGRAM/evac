<html>
<head>
<style>
    body {font-family: Verdana, sans serif; }
    th { text-align: left; background-color: #200040; color: #ffffff;}
</style>
<body>
<h1>EVAC Reports</h1>
<a href="report_times.php">Generate session time report</a>

<h2>View reports</h2>
<?php

$reportFiles = scandir("reports/");

echo '<ul>';
echo '<table border="0" cellspacing="4" cellpadding="4">';
echo '<tr><th style="width:150px">Name</th><th style="width:150px;">Date</th><th>&nbsp;</th><th>&nbsp;</th></tr>';

foreach ($reportFiles as $reportFile)
{
    if ($reportFile != "." && $reportFile != "..")
    {
        $filename = pathinfo(basename($reportFile))['filename'];
        $string = file_get_contents("reports/" . $reportFile);
        $json = json_decode($string, true);

        echo '<td>' . $json['name'] . '</td>';
        echo '<td style="background-color: #e0e0e0">' . $json['date'] . '</td>';
        echo '<td><a href="view_report.html#' . $reportFile . '">View Report</a></td>';

        if (file_exists("./reports_csv/" . $filename . ".csv"))
            echo '<td style="background-color: #e0e0e0"><a type="text/csv" href="download_csv.php?reportFile=' . $filename . ".csv" . '">Download CSV</a></td>';
        else
            echo '<td style="background-color: #e0e0e0"><a href="reports_generate_csv_single.php?reportFile=' . $reportFile . '">Generate CSV</td>';

        echo '</tr>';
    }
}
echo '</table>';

?>

</body>
</html>