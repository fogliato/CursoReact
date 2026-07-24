# Implementation Plan: Adicionar Campo de Especialidade ao Formulário de Funcionários

**Status**: 📋 PLANNING  
**Feature**: Especialidade Field Addition  
**Date**: 2026-07-24  
**Branch**: TesteSdd  
**Specification**: [ExplicacaoSDD/SPECIFICATION.md](../../../ExplicacaoSDD/SPECIFICATION.md)  
**Constitution**: [.specify/memory/constitution.md](.specify/memory/constitution.md)  

---

## Technical Context

### Technology Stack
- **Framework**: React 18+ (Create React App)
- **State Management**: React Hooks (useState, useContext)
- **CSS**: Plain CSS (co-located with components)
- **Data Persistence**: localStorage with parent state sync
- **Browser Compatibility**: All modern browsers

### Existing Component Architecture
- **Formulario.js**: Form container; manages form state (nome, cargo, imagem, time)
- **CampoTexto.js**: Reusable text input component with validation support
- **Colaborador.js**: Employee card display component; renders individual employee info
- **Time.js**: Container for displaying employee cards; iterates over colaborador array

### Integration Points
- Form state management in `Formulario` component
- Field validation before submission
- Data persistence to localStorage on submit/mount
- Card rendering in `Colaborador` with conditional field display

---

## Constitutional Alignment

### Principles Applied
✅ **Component-First Architecture**: Reuse existing `CampoTexto` component; isolate especialidade field logic  
✅ **React Hooks for State Management**: Use `useState` for field state in Formulario  
✅ **Validation-First Development**: Validate especialidade on form submission (non-negotiable)  
✅ **Accessibility as Core**: Proper label with `htmlFor`, ARIA for errors, keyboard navigation  
✅ **Performance**: Validation <50ms; localStorage async I/O optimized  

### Standards Compliance
✅ **Coding Standards**: PascalCase components, JSDoc, max 150-line functions  
✅ **Security**: Sanitize user input; prevent XSS; no hardcoded data  
✅ **Testing**: Validate rules tested; display logic verified  

---

## Design Artifacts

### Data Model

```
Employee {
  nome: string         // existing
  cargo: string        // existing
  imagem: string       // existing
  time: string         // existing
  especialidade: string (NEW)  // required, max 255 chars, alphanumeric + common special chars
}

FormState {
  nome: string
  cargo: string
  imagem: string
  time: string
  especialidade: string (NEW)
  erros: { especialidade?: string }  // error tracking
}

LocalStorage {
  key: 'CursoReact_FormState'
  value: FormState
}
```

### Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| especialidade | Required (not empty/whitespace) | "O campo Especialidade é obrigatório" |
| especialidade | Max 255 characters | "Especialidade não deve ultrapassar 255 caracteres" |
| especialidade | Alphanumeric + spaces/hyphens/commas/parens/slashes | "Especialidade contém caracteres inválidos" |

### State Machine: Error Handling

```
[Valid Input] ─→ (error cleared) ─→ [No Error Shown]
     ↑
     │ (error cleared on valid keystroke)
     │
[Submit Empty] ─→ (error shown) ─→ [Error Persists] ─→ [User Types]
```

### Behavioral Contracts

**Form Submission Flow**:
```
handleSubmit() {
  1. Validate especialidade field
  2a. If invalid: show error, block submit ✗
  2b. If valid: proceed with submission
  3. Save especialidade to localStorage + state
  4. Clear any previous error message
  5. Render success (emit colaborador to team)
}
```

**Form Reset Flow**:
```
handleReset() {
  1. Clear form fields (state)
  2. Clear localStorage completely
  3. Clear error messages
  4. Return to blank form
}
```

**Card Rendering Flow**:
```
Colaborador({ especialidade, ... }) {
  1. Check if especialidade exists && is non-empty
  2a. If yes: render "Especialidade: {value}" line
  2b. If no: omit line entirely (no empty labels)
  3. Maintain card layout integrity
}
```

### API/Component Contracts

**CampoTexto Props**:
```jsx
<CampoTexto
  label="Especialidade"
  placeholder="Digite a especialidade"
  name="especialidade"
  value={estado.especialidade}
  onChange={handleInputChange}
  erro={erros.especialidade}
/>
```

**Colaborador Props** (modified):
```jsx
<Colaborador
  nome={colaborador.nome}
  cargo={colaborador.cargo}
  imagem={colaborador.imagem}
  time={colaborador.time}
  especialidade={colaborador.especialidade}  // NEW
/>
```

---

## Implementation Strategy

### Phase 1: Form Field Addition
**Objective**: Add and wire especialidade field to form with validation

**Steps**:
1. Update `Formulario.js` state to include `especialidade: ""`
2. Add error tracking: `erros.especialidade`
3. Add `<CampoTexto />` instance for especialidade below cargo field
4. Wire onChange handler to update state
5. Add validation logic to handleSubmit:
   - Check if especialidade is empty/whitespace (trim before check)
   - Check length ≤ 255
   - Check allowed character set (alphanumeric + spaces/hyphens/commas/parens/slashes)
   - Display error if invalid; block submission
6. Wire error display below field: `{erros.especialidade && <span className="erro">{erros.especialidade}</span>}`
7. Auto-clear error when field becomes valid

**Acceptance**:
- Field renders below Cargo ✓
- Validation fires on submit ✓
- Error message displays correctly ✓
- Error clears when field is corrected ✓

---

### Phase 2: Data Persistence
**Objective**: Persist especialidade data to localStorage and sync on mount

**Steps**:
1. Create utility function `persistFormState(state)`: saves entire form state to localStorage
2. Create utility function `loadFormState()`: reads form state from localStorage
3. Add `useEffect` to Formulario on mount:
   - Call loadFormState()
   - If data exists, populate all fields including especialidade
4. Update handleSubmit to call persistFormState after validation passes
5. Update handleReset to clear localStorage entirely:
   - localStorage.removeItem('CursoReact_FormState')
6. Test page refresh: especialidade should persist

**Acceptance**:
- Especialidade saves on form submit ✓
- Especialidade loads on page reload ✓
- Reset clears localStorage ✓
- No localStorage key collision with other fields ✓

---

### Phase 3: Card Display & Integration
**Objective**: Display especialidade on employee card and integrate with Time component

**Steps**:
1. Update `Colaborador.js` to accept `especialidade` prop
2. Add conditional render for especialidade line:
   ```jsx
   {especialidade && <p className="especialidade">Especialidade: {especialidade}</p>}
   ```
3. Style especialidade consistently with Cargo field (reuse same className/styling)
4. Update `Formulario.js` to pass especialidade when creating new colaborador:
   ```jsx
   const novoColaborador = {
     nome, cargo, imagem, time, especialidade
   };
   ```
5. Verify Time component receives updated colaborador array and renders correctly
6. Test with missing especialidade prop (graceful omission, no errors)

**Acceptance**:
- Especialidade displays on card ✓
- Styling matches Cargo field ✓
- Line omitted if especialidade missing ✓
- No card layout breaks ✓

---

## Quality Gates

### Gate 1: Specification → Plan Coverage
**Requirement Mapping**:

| SPEC Section | Plan Coverage | Status |
|--------------|---------------|--------|
| Entrada de Formulário (REQ-1.1) | Phase 1 | ✅ |
| Validação (REQ-1.2) | Phase 1 | ✅ |
| Exibição do Card (REQ-1.3) | Phase 3 | ✅ |
| Fluxo de Dados (REQ-1.4) | Phase 2 | ✅ |
| localStorage persistence (Q1 clarification) | Phase 2 | ✅ |
| Reset localStorage (Q2 clarification) | Phase 2 | ✅ |
| Error timing (Q3 clarification) | Phase 1 | ✅ |
| Consistent behavior (Q4 clarification) | Phase 1 | ✅ |
| Omit missing field (Q5 clarification) | Phase 3 | ✅ |

**Status**: ✅ **PASS** — All requirements traced to implementation phases

---

## Dependencies & Blockers

### External Dependencies
- None (no new npm packages required)

### Internal Dependencies
- CampoTexto component (already exists, no modifications needed)
- Colaborador component (modification required for especialidade prop)
- localStorage API (browser native)

### Blockers
- None identified

---

## Effort Estimate

| Phase | Task | Estimate | Notes |
|-------|------|----------|-------|
| 1 | Add field to form | 30 min | Straightforward; follows existing patterns |
| 1 | Add validation logic | 20 min | Rules are clear; follows Constitution standards |
| 1 | Wire error display | 15 min | Reuse existing error styling |
| 2 | Create persistence utilities | 25 min | localStorage wrappers |
| 2 | Add useEffect + persistence | 20 min | Standard React pattern |
| 3 | Update Colaborador component | 15 min | Conditional render only |
| 3 | Integration + testing | 20 min | Verify display and data flow |
| **TOTAL** | | **145 min (~2.5 hours)** | Including manual testing |

---

## Testing Strategy

### Unit Tests
- ✅ Validation function returns correct error for empty input
- ✅ Validation function returns correct error for >255 chars
- ✅ Validation function returns correct error for invalid characters
- ✅ Validation function passes for valid input
- ✅ localStorage utilities save/load state correctly
- ✅ Colaborador renders especialidade when prop provided
- ✅ Colaborador omits especialidade when prop missing

### Integration Tests
- ✅ Form field appears below Cargo field
- ✅ Form validates on submit (not on blur)
- ✅ Error shows/hides correctly
- ✅ Data persists across page reload
- ✅ Reset clears localStorage
- ✅ Especialidade displays on employee card
- ✅ Card layout remains intact

### Manual Verification
- [ ] Type especialidade in form
- [ ] Submit empty form (error should show)
- [ ] Type valid especialidade
- [ ] Error should clear
- [ ] Submit form
- [ ] Refresh page (field should still have value)
- [ ] View employee card (especialidade should display)
- [ ] Click reset (form cleared, localStorage cleared)
- [ ] Edit employee with no especialidade (card displays without error)

---

## Success Criteria

✅ Feature is specification-compliant  
✅ All 10 acceptance criteria met  
✅ Constitution requirements followed  
✅ All clarifications integrated (Q1-Q5)  
✅ No breaking changes to existing components  
✅ Data persists correctly  
✅ Card displays gracefully with/without data  
✅ Accessibility (WCAG 2.1 Level A) maintained  
✅ Performance: validation <50ms  
✅ Tests passing (unit + integration)  

---

## Next Phase

After implementation and testing:
1. Generate `tasks.md` with specific task breakdown
2. Execute implementation phase
3. Validate runtime behavior
4. Deploy to production
5. Commit and close feature branch
