<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="styles.css">
        <title>Otakle - Anime and Gaming Wordle</title>
    </head>
    
    <!-- Main content -->
    <body>
        <h1>Otakle</h1>
        <p style="margin-top:-20px; font-size:14px;">A Wordle version for anime and gaming characters</p>
        <?php

            //We create the table where user both write, and check if a word has any correct or misplaced letters.
            echo "<table class='center', id='grid'>";
            for($i=0; $i<6; $i++) {
                echo "<tr>";
                for($j=0; $j<5; $j++) {
                    echo '<td class="cell"></td>';
                }
                echo "</tr>";
            }
            echo("</table></br></br>");

            //We create the keyboard
            $firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
            $secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
            $thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
            
            echo "<table class='center', id='keys'>";
            echo "<tr>";
                foreach($firstRow as $key) {
                    echo "<td class='keyboard'><input class='keybutton' type='button' value='" . $key . "' onclick='keyboardKey(this);'/></td>";
                }
            echo "</tr><tr>";
                foreach($secondRow as $key) {
                    echo "<td class='keyboard'><input class='keybutton' type='button' value='" . $key . "' onclick='keyboardKey(this);'/></td>";
                }
            echo "</tr><tr>";
                echo "<td class='keyboardspecial'><input class='keybutton' type='button' value='ENTER' onclick='keyboardKey(this);'/></td>";
                foreach($thirdRow as $key) {
                    echo "<td class='keyboard'><input class='keybutton' type='button' value='" . $key . "' onclick='keyboardKey(this);'/></td>";
                }
                echo "<td class='keyboardspecial'><input class='keybutton' type='button' value='BACK' onclick='keyboardKey(this);'/></td>";
            echo "</tr>";
            echo "</table>";
        ?>

        <div id="correct" class="correctMessage" disabled></div>
        <div id="copied" class="correctMessage" disabled></div>
        <div id="invalid" class="incorrectMessage" disabled>Not in character list</div>

        <div id="results" class="results">
            <input type="button" class="xbutton" value="X" onClick="hideResults();"></input>
            <table>
                <tr >
                    <td style="width:30%; padding-left:15px;"><img id="picture" style="width:100%"></img></td>
                    <td style="padding-right:15px"><p id="answerinfo"></p></td>
                </tr>
                <tr>
                    <td colspan=2 style="padding:8px;">
                        <table style="width:97%">
                            <p>Guess Distribution</p>
                            <?php
                                for($i=1; $i<=6; $i++) {
                                    echo "<tr>";
                                        echo "<td style=\"width:5%\">" . $i . "</td>";
                                        echo "<td>";
                                            echo "<div id=\"attempts" . $i . "\" class=\"bargraph\">.</div>";
                                        echo "</td>";
                                    echo "</tr>";
                                }
                            ?>
                        </table>    
                        <div style="padding-top:15px">
                            <input type="button" class="copybutton" value="Copy result to clipboard" onClick="copyToClipboard();"></input>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </body>

    <script src="functions.js"></script>
</html>