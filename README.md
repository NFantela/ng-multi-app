# NgMultiApp

# 1 CONTENTS
-- Uses NGRX store
-- Has separated importable calendar module for angular
-- Has separate routed store dashboard app

# 1.1. SCSS uses SMACSS and BEM methodology

# 2 Calendar
-- Should have DAILY WEEKLY MONTHLY options to select on top
-- allow passing of ng-template that will be displayed in field

# 2.1 Calendar body
-- try to make it as a table with different cellse BUT REMEMBER ng Template passed

 -- take note:
    - component can be used as a directive e.g. <tbody mat-calendar-body>
-- logic
    calendar-component 
        week-view-component
            - table with tbody + calendar-body component used as directive
        month-view-component
            - table with tbody + calendar-body component used as directive
        day-view-component
            - table with tbody + calendar-body component used as directive        

