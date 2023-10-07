package dev.sat_score.SAT.model;

import org.apache.commons.csv.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/sat-results")
public class SATResultController {

    private static final String CSV_FILE_PATH = "SAT_results.csv";
    private static List<SATResult> satResults = readDataFromCSV();

    @PostMapping("/")
    public String insertSatResult(@RequestBody SATResult satResult) {

        float satScore = satResult.getSatScore();
        System.out.println("SAT Score (sat): " + satScore);
        // Calculate "passed" status here
            System.out.println("SAT Score "+ satResult.getSatScore());
        // Add SAT Result to the list (in-memory storage)
        if (satResult.getSatScore() > 0.3 * 1600) {

            satResult.setPassed(true);
        } else {
            satResult.setPassed(false);
        }
        satResults.add(satResult);

        // Write data to CSV file
        writeDataToCSV(satResults);

        return "SAT Result inserted successfully";
    }

    @GetMapping("/view")
    public List<SATResult> getAllSatResults() {
        return satResults;
    }

    @GetMapping("rank/{name}")
    @ResponseBody
    public Map<String, Object> getRank(@PathVariable String name) {
    // Implement the getRank method as needed
    Optional<SATResult> candidate = satResults.stream()
            .filter(result -> result.getName().equals(name))
            .findFirst();

    Map<String, Object> response = new HashMap<>();

    if (candidate.isPresent()) {
        // Sort the SAT results by score in descending order
        satResults.sort(Comparator.comparingDouble(SATResult::getSatScore).reversed());

        // Find the rank of the candidate
        int rank = satResults.indexOf(candidate.get()) + 1;
        System.out.println("Rank "+rank);

        response.put("rank", rank);
    } else {
        response.put("error", "Candidate with name " + name + " not found");
    }
    System.out.println(response);
    return response;
}

    @PutMapping("/update/{name}")
    public ResponseEntity<String> updateScore(
        @PathVariable String name,
        @RequestParam float newScore) {

    // Validate the new score
    if (newScore < 0.0 || newScore > 1600.0) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body("Invalid SAT Score. It should be between 0 and 1600.");
    }

    Optional<SATResult> candidate = satResults.stream()
        .filter(result -> result.getName().equals(name))
        .findFirst();

    if (candidate.isPresent()) {
        // Update the SAT score for the candidate
        candidate.get().setSatScore(newScore);

        // Recalculate the "passed" status
        if (newScore > 0.3 * 1600) {
            candidate.get().setPassed(true);
        } else {
            candidate.get().setPassed(false);
        }

        // Write data to CSV file
        writeDataToCSV(satResults);

        return ResponseEntity.ok("SAT Score for " + name + " is updated to " + newScore);
    } else {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body("Candidate with name " + name + " not found");
    }
}

      


@DeleteMapping("/delete/{name}")
public ResponseEntity<String> deleteRecord(@PathVariable String name) {
    // Find the SATResult by name
    Optional<SATResult> satResultToRemove = satResults.stream()
            .filter(result -> result.getName().equals(name))
            .findFirst();

    if (satResultToRemove.isPresent()) {
        // Remove the SATResult from the list
        satResults.remove(satResultToRemove.get());

        // Write data to CSV file
        writeDataToCSV(satResults);

        return ResponseEntity.ok("Record deleted for " + name);
    } else {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Record with name " + name + " not found");
    }
}

    private static List<SATResult> readDataFromCSV() {
        List<SATResult> satResults = new ArrayList<>();
        try (Reader reader = new FileReader(CSV_FILE_PATH);
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader())) {

            for (CSVRecord csvRecord : csvParser) {
                SATResult satResult = new SATResult();
                satResult.setName(csvRecord.get("Name"));
                satResult.setAddress(csvRecord.get("Address"));
                satResult.setCity(csvRecord.get("City"));
                satResult.setCountry(csvRecord.get("Country"));
                satResult.setPincode(csvRecord.get("Pincode"));
                satResult.setSatScore(Float.parseFloat(csvRecord.get("SAT Score")));
                satResult.setPassed(Boolean.parseBoolean(csvRecord.get("Passed")));

                satResults.add(satResult);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return satResults;
    }

    private static void writeDataToCSV(List<SATResult> satResults) {
        try (Writer writer = new FileWriter(CSV_FILE_PATH);
             CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("Name", "Address", "City", "Country", "Pincode", "SAT Score", "Passed"))) {

            for (SATResult satResult : satResults) {
                csvPrinter.printRecord(
                        satResult.getName(),
                        satResult.getAddress(),
                        satResult.getCity(),
                        satResult.getCountry(),
                        satResult.getPincode(),
                        satResult.getSatScore(),
                        satResult.isPassed()
                );
            }
            csvPrinter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
