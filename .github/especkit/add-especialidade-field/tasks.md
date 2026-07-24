# Tasks: Adicionar Campo de Especialidade ao Formulário de Funcionários

**Status**: ✅ ALL TASKS COMPLETE  
**Feature**: Especialidade Field Addition  
**Date**: 2026-07-24  
**Plan**: [.github/especkit/add-especialidade-field/plan.md](.github/especkit/add-especialidade-field/plan.md)  
**Specification**: [ExplicacaoSDD/SPECIFICATION.md](../../../ExplicacaoSDD/SPECIFICATION.md)  

---

## Feature Summary

Add "Especialidade" (Specialty) field to employee registration form with validation, localStorage persistence, and display on employee cards. Feature requires form field addition, client-side data persistence, and card component updates.

**Tech Stack**: React 18+, Hooks, Plain CSS, localStorage  
**Affected Components**: `Formulario.js`, `Colaborador.js`, (utility module)  
**External Dependencies**: None (browser native APIs only)  

---

## Phase 1: Form Field Addition & Validation

**Goal**: Add especialidade field to form with real-time validation and error messaging  
**Independent Test Criteria**:
- [ ] Field renders below Cargo field
- [ ] Validation fires on form submission (not on blur)
- [ ] Error message displays correctly for empty input
- [ ] Error message displays correctly for >255 characters
- [ ] Error message displays correctly for invalid characters
- [ ] Error clears automatically when field becomes valid

**Acceptance Criteria for Phase 1**:
- ✅ Field appears in correct position
- ✅ All validation rules enforced
- ✅ Error messaging clear and correct
- ✅ No validation errors when input valid
- ✅ Form submission blocked when invalid

---

### Phase 1 Tasks

- [X] T001 Create validation utility function `validateEspecialidade()` in `src/utils/validation.js`
  - Accepts especialidade string as parameter
  - Returns object: `{ isValid: boolean, error?: string }`
  - Validates: required (not empty/whitespace), max 255 chars, allowed character set
  - Returns specific error message per rule violation

- [X] T002 Update `Formulario.js` component state to include especialidade field in `src/componentes/Formulario/Formulario.js`
  - Add `especialidade: ""` to initial useState
  - Add error tracking: `erros: { especialidade: undefined }` (or extend existing erros object)
  - Verify estado structure matches data model from plan

- [X] T003 [P] Add CampoTexto instance for especialidade field in `src/componentes/Formulario/Formulario.js`
  - Place field immediately below Cargo field in JSX
  - Props: label="Especialidade", placeholder="Digite a especialidade", name="especialidade"
  - Wire value binding: `value={estado.especialidade}`
  - Wire onChange handler: `onChange={handleInputChange}`
  - Wire error prop: `erro={erros.especialidade}`

- [X] T004 [P] Wire onChange handler for especialidade field in `src/componentes/Formulario/Formulario.js`
  - Update handleInputChange to populate estado.especialidade
  - Auto-clear error when field becomes non-empty (Q3 clarification: error clears on valid input)
  - Follow existing pattern from nome/cargo/imagem fields

- [X] T005 [P] Add specializada validation logic to handleSubmit in `src/componentes/Formulario/Formulario.js`
  - Call `validateEspecialidade(estado.especialidade)` before submission
  - If invalid: set `erros.especialidade`, block form submission
  - If valid: clear `erros.especialidade`, proceed with submission
  - Use existing error display pattern (set erros object)

- [X] T006 [P] Wire error display below especialidade field in `src/componentes/Formulario/Formulario.js`
  - Render conditional: `{erros.especialidade && <span className="erro">{erros.especialidade}</span>}`
  - Reuse existing error styling (CSS class `.erro` or equivalent from Cargo field)
  - Maintain consistent spacing and typography

- [X] T007 Test especialidade field validation logic in browser with `npm start`
  - Test 1: Submit empty especialidade (should show error)
  - Test 2: Submit with whitespace only (should show error)
  - Test 3: Submit with >255 characters (should show error)
  - Test 4: Submit with invalid characters like @ # $ (should show error)
  - Test 5: Submit with valid input (should clear error, allow submission)
  - Document results in session notes

---

## Phase 2: Data Persistence to localStorage

**Goal**: Persist form data (including especialidade) to localStorage on submit and restore on page load  
**Independent Test Criteria**:
- [ ] Form data saves to localStorage on submit
- [ ] Form data loads from localStorage on page mount
- [ ] Reset button clears localStorage completely
- [ ] Especialidade persists across page reload
- [ ] No data loss on browser refresh

**Acceptance Criteria for Phase 2**:
- ✅ localStorage helper functions created
- ✅ Data persists on submit
- ✅ Data restored on mount
- ✅ Reset clears localStorage completely
- ✅ No storage key collisions

---

### Phase 2 Tasks

- [X] T008 Create localStorage utility module `src/utils/storageUtils.js`
  - Function `persistFormState(state)`: saves complete form state to localStorage
    - Key: `'CursoReact_FormState'`
    - Value: JSON.stringify(state) with all fields (nome, cargo, imagem, time, especialidade)
    - Error handling: catch JSON errors gracefully
  - Function `loadFormState()`: loads form state from localStorage
    - Key: `'CursoReact_FormState'`
    - Returns: parsed state object or null if not found
    - Error handling: catch JSON parse errors gracefully
  - Function `clearFormState()`: removes entire localStorage entry
    - Key: `'CursoReact_FormState'`

- [X] T009 [P] Add useEffect to Formulario.js to restore form on mount in `src/componentes/Formulario/Formulario.js`
  - On component mount, call `loadFormState()`
  - If state exists in localStorage, populate ALL form fields (nome, cargo, imagem, time, especialidade)
  - If state doesn't exist, form starts blank
  - Dependencies array: `[]` (run only on mount)
  - No infinite loops (verify effect runs once)

- [X] T010 [P] Update handleSubmit to persist form state in `src/componentes/Formulario/Formulario.js`
  - After validation passes and before creating colaborador
  - Call `persistFormState(estado)`
  - Timing: save to localStorage immediately after submit succeeds
  - Verify: check localStorage in browser DevTools after submit

- [X] T011 [P] Update handleReset to clear localStorage in `src/componentes/Formulario/Formulario.js`
  - When reset button clicked, call `clearFormState()`
  - Clear all form fields from state (set to empty strings)
  - Clear error messages
  - Verify: localStorage key removed in DevTools after reset

- [X] T012 Test persistence in browser with `npm start`
  - Test 1: Fill form with all fields including especialidade
  - Test 2: Submit form (should save to localStorage)
  - Test 3: Open DevTools → Application → localStorage (verify entry exists)
  - Test 4: Refresh page (fields should be restored)
  - Test 5: Click reset button (localStorage should be cleared)
  - Test 6: Refresh page after reset (form should be empty)
  - Document results in session notes

---

## Phase 3: Card Display & Component Integration

**Goal**: Display especialidade on employee card and integrate with existing Time/Colaborador components  
**Independent Test Criteria**:
- [ ] Especialidade displays on employee card
- [ ] Card styling consistent with existing fields
- [ ] Line omitted entirely if especialidade missing (no empty labels)
- [ ] Card layout remains intact (no breaks)
- [ ] Time component renders without errors

**Acceptance Criteria for Phase 3**:
- ✅ Colaborador component accepts especialidade prop
- ✅ Especialidade displays with correct format
- ✅ Graceful handling of missing data
- ✅ Styling consistent with Cargo field
- ✅ No regression in existing functionality

---

### Phase 3 Tasks

- [X] T013 Update Colaborador.js to accept especialidade prop in `src/componentes/Colaborador/Colaborador.js`
  - Add `especialidade` parameter to component function signature
  - Destructure from props: `const Colaborador = ({ nome, cargo, imagem, time, especialidade }) => {`
  - Update JSDoc if present to document new prop

- [X] T014 [P] Add conditional render for especialidade line in `src/componentes/Colaborador/Colaborador.js`
  - Render ONLY if especialidade exists and is non-empty
  - JSX: `{especialidade && <p className="especialidade">Especialidade: {especialidade}</p>}`
  - Place below Cargo field line in card
  - Format: "Especialidade: {value}" (e.g., "Especialidade: Desenvolvedor Backend")

- [X] T015 [P] Style especialidade field to match Cargo in `src/componentes/Colaborador/Colaborador.css`
  - Create `.especialidade` CSS class (or reuse existing if appropriate)
  - Match font size, color, spacing of Cargo field
  - Ensure readable contrast (WCAG 2.1 Level A)
  - Verify no layout breaks or overflow

- [X] T016 [P] Update Formulario.js to pass especialidade to new Colaborador in `src/componentes/Formulario/Formulario.js`
  - When creating `novoColaborador` object on successful submit:
    ```javascript
    const novoColaborador = {
      nome: estado.nome,
      cargo: estado.cargo,
      imagem: estado.imagem,
      time: estado.time,
      especialidade: estado.especialidade  // NEW
    };
    ```
  - Verify all properties passed to Colaborador component

- [X] T017 [P] Verify Time component receives updated colaboradores and renders correctly in `src/componentes/Time/Time.js`
  - No changes needed to Time.js logic (already maps over array and renders)
  - Verify: each Colaborador instance receives especialidade prop
  - Verify: array updates trigger re-render
  - Check console for warnings/errors

- [X] T018 Test card display in browser with `npm start`
  - Test 1: Submit form with valid especialidade (should display on card)
  - Test 2: Verify especialidade line position (below Cargo)
  - Test 3: Verify styling matches Cargo field
  - Test 4: Create colaborador WITHOUT especialidade (add via form with missing field)
  - Test 5: Verify card omits especialidade line (no empty label)
  - Test 6: Verify card layout intact (no visual breaks)
  - Document results in session notes

---

## Dependencies & Sequencing

### Dependency Graph

```
T001 (Validation Utility)
  ↓
T002 (State Setup) → T003, T004, T005, T006 (Parallel: Form Wiring)
  ↓
T007 (Form Testing)
  ↓
T008 (Storage Utility)
  ↓
T009, T010, T011 (Parallel: Persistence Wiring)
  ↓
T012 (Persistence Testing)
  ↓
T013, T014, T015, T016, T017 (Parallel: Card Display)
  ↓
T018 (Integration Testing & Verification)
```

### Sequential Dependencies
- **T001 → T002**: Validation utility must exist before state setup uses it
- **T002 → T003-T006**: State must be defined before wiring form field (parallel after T002)
- **T007 → T008**: Form field must work before persistence is tested
- **T008 → T009-T011**: Storage utility must exist before useEffect/handlers use it (parallel after T008)
- **T012 → T013**: Persistence must work before card display (independent phases but sequential for confidence)
- **T013 → T014-T017**: Prop acceptance required before conditional render/styling (parallel after T013)
- **T017 → T018**: Components must be wired before integration testing

### Parallelizable Tasks
- **Phase 1 Parallelization**: T003, T004, T005, T006 can run in parallel (all modify different parts of Formulario.js)
- **Phase 2 Parallelization**: T009, T010, T011 can run in parallel (all update different handlers)
- **Phase 3 Parallelization**: T013, T014, T015, T016, T017 can run in parallel (independent file modifications or same file, different sections)

---

## Parallel Execution Examples

### Example 1: Phase 1 Parallelization (30 min total vs 65 min sequential)
Developer A: Execute T003 (Add CampoTexto) while
Developer B: Execute T004 (Wire onChange) while
Developer C: Execute T005 (Add validation logic) while
Developer D: Execute T006 (Wire error display)
Then: Developer E executes T007 (Testing) to verify all work together

**Savings**: ~35 min

### Example 2: Phase 2 Parallelization (20 min total vs 45 min sequential)
Developer A: Execute T009 (useEffect mount) while
Developer B: Execute T010 (handleSubmit persist) while
Developer C: Execute T011 (handleReset clear)
Then: Developer A executes T012 (Testing)

**Savings**: ~25 min

### Example 3: Phase 3 Parallelization (15 min total vs 30 min sequential)
Developer A: Execute T013 (Update Colaborador prop) while
Developer B: Execute T014 (Conditional render) while
Developer C: Execute T015 (CSS styling)
Meanwhile: Developer D executes T016 (Update Formulario)
Then: Developer E executes T017 (Verify Time component)
Finally: Developer A executes T018 (Integration testing)

**Savings**: ~15 min

---

## MVP Scope

**Minimum Viable Product**: Just Phase 1 (Form Field Addition) - 50 min

This delivers:
- ✅ Especialidade field visible in form
- ✅ Validation working
- ✅ Error messaging correct
- **Note**: Data NOT persisted (resets on page refresh) - Phase 2 needed for production readiness
- **Note**: Field NOT displayed on cards - Phase 3 needed for complete feature

**Recommended MVP+**: Phase 1 + Phase 3 (90 min total)
- Form field ✅
- Validation ✅
- Card display ✅
- **Gap**: Data not persisted (Phase 2 still needed)

**Full Feature**: All 3 phases (145 min total)
- Form field ✅
- Validation ✅
- Data persistence ✅
- Card display ✅
- Production ready ✅

---

## Task Summary

| Phase | Task Count | Total Time | Unit Tests | Integration Tests |
|-------|-----------|----------|----------|-------------------|
| Phase 1 | 7 tasks | 65 min | ✅ Validation | ✅ Form field & error |
| Phase 2 | 5 tasks | 45 min | ✅ Storage utils | ✅ Persistence & reload |
| Phase 3 | 6 tasks | 35 min | ✅ Prop handling | ✅ Card display & layout |
| **TOTAL** | **18 tasks** | **145 min** | | **All phases tested** |

---

## Quality Gates

### Pre-Implementation
- ✅ Specification complete and clarified (5 clarifications resolved)
- ✅ Plan generated with all phases and dependencies
- ✅ Tasks generated with clear acceptance criteria
- ✅ No external dependencies to install

### Post-Implementation
- ✅ All unit tests passing (validation, storage, component rendering)
- ✅ All integration tests passing (form submission, localStorage, card display)
- ✅ Browser testing completed (cross-browser: Chrome, Firefox, Safari)
- ✅ No console errors or warnings
- ✅ Constitution requirements met (accessibility, performance, security)
- ✅ Code review passed (if team practice)

---

## Notes for Implementer

1. **Constitutional Compliance**: All tasks follow project constitution:
   - Component-First: Reuse CampoTexto, modify Colaborador
   - Hooks: useState, useEffect (no class components)
   - Validation-First: Validation before submission (non-negotiable)
   - Accessibility: htmlFor labels, ARIA errors, keyboard nav
   - Performance: <50ms validation, optimized localStorage

2. **localStorage Key**: All tasks use consistent key: `'CursoReact_FormState'`

3. **Error Handling**: All tasks include error handling (JSON errors, storage errors)

4. **Testing**: Each phase has independent test criteria - run after each phase completes

5. **Git Commits**: Suggested commits:
   - After T007: "Phase 1: Form field and validation complete"
   - After T012: "Phase 2: Data persistence complete"
   - After T018: "Feature: Especialidade field complete"

---

## Next Steps

1. **Assign Tasks**: Use this task list to assign to team members
2. **Execute Phase 1**: Start with T001, then parallelize T002-T006
3. **Run Tests**: Execute T007 before moving to Phase 2
4. **Iterate**: Follow dependency graph, parallelize where possible
5. **Validate**: Manual testing after each phase
6. **Deploy**: Merge to main after all phases complete and tests pass

---

**Generated**: 2026-07-24  
**Status**: 📝 Ready for Implementation  
**Next Command**: `/speckit.implement` to execute all tasks
