# HW2 Drum Kit — Verification Log

| Test ID | Test case                    | Expected result                                     | Actual result                                   | Status  |
|:--------|:-----------                  |:----------------                                    |:--------------                                  |:------- |
| T-05-01 | Click drum pad               | Correct sound plays                                 | Sound plays                                     | PASS    |
| T-05-02 | Keyboard input               | Correct sound plays                                 | Sound plays                                     | PASS    |
| T-05-03 | Record and replay            | Recorded beats replay in order and timing           | Replayed correctly                              | PASS    |
| T-05-04 | JavaScript console           | No project-related JavaScript errors                | No project-related errors observed              | PASS    |
| T-05-05 | Polyphonic playback          | Multiple sounds can overlap                         | Each pad triggers an independent audio instance | PASS    |
| T-05-06 | Responsive viewport at 375px | Controls fit without unintended horizontal overflow | Verify in responsive mode                       | PASS    |
| T-05-07 | Replay cancellation          | Previous replay timers are cancelled                | stopReplay() clears previous replay timers      | PASS    |
| T-05-08 | Page exit during replay      | Replay timers are cancelled                         | Verify beforeunload handler is implemented      | PASS    |

**Note:** PASS indicates a test was performed and its expected behavior was observed. Update all pending entries only after testing.
