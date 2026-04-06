# Lombok Setup for Maven/Spring Boot

1. Ensure your pom.xml includes Lombok as a dependency (already present).
2. Remove any exclusions for Lombok in build plugins (already done).
3. Install Lombok plugin in your IDE:
   - For VS Code: Install 'Lombok Annotations Support for VS Code' extension.
   - For IntelliJ: Go to Settings > Plugins > Search 'Lombok' > Install.
4. Enable annotation processing in your IDE:
   - For IntelliJ: Settings > Build, Execution, Deployment > Compiler > Annotation Processors > Enable.
   - For VS Code: No extra steps needed if extension is installed.
5. Clean and rebuild the project:
   - Run: mvn clean install
6. Restart backend server:
   - Run: mvn spring-boot:run

If you still see errors, ensure your IDE is using the correct JDK (Java 17) and Lombok is enabled.

---

# Troubleshooting
- If you see NoClassDefFoundError for Lombok, your IDE or build tool is not processing Lombok annotations.
- Make sure Lombok is installed and annotation processing is enabled.
- If using NetBeans, update to the latest version or switch to IntelliJ/VS Code for better Lombok support.

---

# Verification
- After setup, check that @Getter/@Setter/@Data annotations generate methods in your entity classes.
- If methods like getName(), setName(), etc. are missing, Lombok is not working.

---

# Reference
- Official Lombok site: https://projectlombok.org/
- VS Code extension: https://marketplace.visualstudio.com/items?itemName=GabrielBB.vscode-lombok
- IntelliJ plugin: https://plugins.jetbrains.com/plugin/6317-lombok
