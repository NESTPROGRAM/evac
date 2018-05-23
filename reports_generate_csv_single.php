<?php

$scores = array();
$scores["pump_antibiotic"]                   = 6.32;
$scores["pump_d10"]                          = 6.32;
$scores["pump_dopamine"]                     = 6.32;
$scores["pump_heparin"]                      = 6.32;
$scores["pump_saline"]                       = 6.32;

$scores["postquake_baby_label"]              = 6.18;
$scores["postquake_corner_alcohol_wipes"]    = 5.09;
$scores["postquake_corner_chart"]            = 5.91;
$scores["postquake_corner_code_sheet"]       = 6.55;
$scores["postquake_corner_flush"]            = 5.27;
$scores["postquake_corner_gloves"]           = 5.55;
$scores["postquake_baby_self_inflating_bag"] = 6.87;
$scores["postquake_baby_cuff"]               = 3.45;
$scores["postquake_baby_clamp"]              = 3.23;
$scores["postquake_baby_hat"]                = 4.77;
$scores["postquake_baby_mask_large"]         = 6.91;
$scores["postquake_baby_mask_small"]         = 6.91;
$scores["postquake_baby_oxygen"]             = 6.74;
$scores["postquake_baby_pacifier"]           = 2.68;
$scores["postquake_baby_stethoscope"]        = 4.27;
$scores["postquake_corner_baby_wipes"]       = 2.5;
$scores["postquake_corner_blankets"]         = 5.95;
$scores["postquake_corner_diapers"]          = 3.09;
$scores["postquake_corner_electrolyte"]      = 2.09;
$scores["postquake_corner_flashlight"]       = 4.68;
$scores["postquake_corner_formula"]          = 2.09;
$scores["postquake_corner_glucose"]          = 2.41;
$scores["postquake_corner_handoff_sheet"]    = 4.55;
$scores["postquake_corner_ivcaps"]           = 3.64;
$scores["postquake_corner_measuring_tape"]   = 2.45;
$scores["postquake_corner_scissors"]         = 4.27;

$scores["postquake_end_folder"]              = 5.91;
$scores["postquake_beside_label"]            = 6.18;
$scores["postquake_end_gloves"]              = 5.55;
$scores["postquake_beside_saline_flush"]     = 5.27;
$scores["postquake_end_blankets"]            = 5.95;
$scores["postquake_beside_alcohol_wipes"]    = 5.09;
$scores["postquake_end_code_sheet"]          = 6.55;
$scores["postquake_beside_hat"]              = 4.77;
$scores["postquake_beside_penlight"]         = 4.68;
$scores["postquake_beside_ivcaps"]           = 3.64;
$scores["postquake_beside_roll_of_tape"]     = 4.27;
$scores["postquake_end_diapers"]             = 3.09;
$scores["postquake_beside_pacifier"]         = 2.68;
$scores["postquake_end_baby_wipes"]          = 2.5;
$scores["postquake_beside_formula"]          = 2.09;
$scores["postquake_beside_glucose"]          = 2.41;
$scores["postquake_beside_electrolyte"]      = 2.09;
$scores["postquake_beside_thermometer"]      = 4.55;
$scores["baby_ecg"]                          = 4.27;
$scores["baby_bp_cuff"]                      = 3.45;
$scores["baby_clamp"]                        = 3.23;

// Retrieve list of report files
$reportFile = $_REQUEST['reportFile'];
$filename = pathinfo(basename($reportFile))['filename'];

echo "<pre>"; print_r($filename); echo "</pre>";

echo "<pre>"; print_r("Generating CSV report for " . $reportFile); echo "</pre>";

echo '<a href="download_csv.php?reportFile=' . $filename . '.csv">Download report</a>&nbsp;&nbsp;&nbsp;';
echo '<a href="reports.php">Return to list</a>';

if ($reportFile != "." && $reportFile != "..")
{
    // Load report
    $report = json_decode(file_get_contents("reports/" . $reportFile), true);

    // Process objects
    $objects = processEvents($report['events']);
    $object_keys = array_keys($objects);
    sort($object_keys);

    // Output header line 1
    $output = "," . determineType($report) . "," . $report['name'] . ",Attempt #1 time,,," . $report['attempt1_duration'] . ",,,Attempt #2 time,,," . $report['attempt2_duration'] . "\n";

    // Output header line 2
    $output .= "Score,Item," . $report['date'] . ",#1 pickup time 1 (s),#1 pickup time 2 (s),#1 pickup time 3 (s),#1 dropped time 1 (s),#1 dropped time 2 (s),#1 dropped time 3 (s),#2 pickup time 1 (s),#2 pickup time 2 (s),#2 pickup time 3 (s),#2 dropped time 1 (s),#2 dropped time 2 (s),#2 dropped time 3 (s)\n";

    // Outout object lines
    foreach ($object_keys as $key)
    {
        $obj = $objects[$key];
        $score = $scores[$key];
        $output .=
            $score . "," . $key . ",," .
            $obj['a1_pickups'][0] . ","  . $obj['a1_pickups'][1] . "," . $obj['a1_pickups'][2] . "," .
            $obj['a2_pickups'][0] . ","  . $obj['a2_pickups'][1] . "," . $obj['a2_pickups'][2] . "," .
            $obj['a1_drops'][0] . ","  . $obj['a1_drops'][1] . "," . $obj['a1_drops'][2] . "," .
            $obj['a2_drops'][0] . ","  . $obj['a2_drops'][1] . "," . $obj['a2_drops'][2] . "\n";
    }

    // Output question responses

    if (isset($report['responses'])) {
        $output .= "\n\n";
        $output .= "Is your patient injured?,\"" . $report['responses'][0] . "\"\n";
        $output .= "Is there any damage to your room?,\"" . $report['responses'][1] . "\"\n";
        $output .= "Please do a repeat back of my instructions,\"" . $report['responses'][2] . "\"\n";
    }

    // Save CSV report
    $filename = "reports_csv/" . basename($reportFile, ".json") . ".csv";
    file_put_contents($filename, $output);
}

// Examine object types to determine simulation
function determineType($report) {

    foreach ($report['events'] as $event)
    {
        if (stripos($event["object"], "_corner"))
            return "NICU";
        else if (stripos($event["object"], "_baby"))
            return "NICU";
        else if (stripos($event["object"], "_beside"))
            return "ED";
        else if (stripos($event["object"], "_end"))
            return "ED";
    }

    return "Unknown";
}

// Convert list of events into list of objects
function processEvents($events)
{
    $objects = [];

    foreach ($events as $event)
    {
        if ($event['action'] == "picked_up" || $event['action'] == "dropped" || $event['action'] == "picked_up_2D")
        {
            // Create object record if necessary
            $obj = isset($objects[$event['object']]) ? $objects[$event['object']] : newObject();

            // Add event time to object record
            if      ($event['attempt'] == 1 && ($event['action'] == "picked_up" || $event['action'] == "picked_up_2D"))
                $obj['a1_pickups'][] = $event['time'];
            else if ($event['attempt'] == 2 && ($event['action'] == "picked_up" || $event['action'] == "picked_up_2D"))
                $obj['a2_pickups'][] = $event['time'];
            else if ($event['attempt'] == 1 && $event['action'] == "dropped")
                $obj['a1_drops'][] = $event['time'];
            else if ($event['attempt'] == 2 && $event['action'] == "dropped")
                $obj['a2_drops'][] = $event['time'];

            // Save object record
            $objects[$event['object']] = $obj;
        }
    }

    // Flesh out objects - ensure all necessary fields have a blank value if not already set
    foreach ($objects as $key => $obj)
    {
        if (! isset($obj['a1_pickups'][0])) $obj['a1_pickups'][0] = "";
        if (! isset($obj['a1_pickups'][1])) $obj['a1_pickups'][1] = "";
        if (! isset($obj['a1_pickups'][2])) $obj['a1_pickups'][2] = "";

        if (! isset($obj['a2_pickups'][0])) $obj['a2_pickups'][0] = "";
        if (! isset($obj['a2_pickups'][1])) $obj['a2_pickups'][1] = "";
        if (! isset($obj['a2_pickups'][2])) $obj['a2_pickups'][2] = "";

        if (! isset($obj['a1_drops'][0])) $obj['a1_drops'][0] = "";
        if (! isset($obj['a1_drops'][1])) $obj['a1_drops'][1] = "";
        if (! isset($obj['a1_drops'][2])) $obj['a1_drops'][2] = "";

        if (! isset($obj['a2_drops'][0])) $obj['a2_drops'][0] = "";
        if (! isset($obj['a2_drops'][1])) $obj['a2_drops'][1] = "";
        if (! isset($obj['a2_drops'][2])) $obj['a2_drops'][2] = "";
    }

    return $objects;
}

// Create blank object record
function newObject() {
    $obj = array();
    $obj['a1_pickups'] = array();
    $obj['a2_pickups'] = array();
    $obj['a1_drops'] = array();
    $obj['a2_drops'] = array();

    return $obj;
}

?>
