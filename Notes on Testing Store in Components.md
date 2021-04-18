# Testing Components with Store, which uses Selectors and Dispatch calls

Unit Testing
- Mock the Store
    - Control the state of the page, which means any unit test can set up the data however wanted, immediately
    - Can assert against dispatch calls easily
- Mock any Selectors that are not implemented
    - Ones that are just go to the mocked Store, which we control the data for already
    - Does create a dependency but they're usually so trivial (and separately unit tested) shouldn't be a bother
    
Store Integration Testing
- Mock only API/Services/etc.
- These tests can be more "E2E"-style, things like "Click X shows Y success message" etc.
- Where to put these tests?
    - Same file? (i.e. app.component.spec.ts)
        - Pro: Easy to find, and can be separate from unit tests / labeled as such thanks to describe()
        - Con: Unit Tests + Integration Tests in one file
        - Pro: Can share common definitions (helper functions for the component etc.)
    - Different file (maybe app.component.integration.spec.ts)
        - Pro: Next to Unit Tests
        - Con: Not the usual convention?
    - Currently doing them in the same file.
