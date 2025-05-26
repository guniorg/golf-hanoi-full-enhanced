@echo off
echo =========================================
echo 🔄 Git 기록 정리 및 강제 Push 시작
echo =========================================

:: Step 1: git-filter-repo가 설치되어 있어야 함
where git-filter-repo >nul 2>nul
if errorlevel 1 (
    echo ❌ git-filter-repo가 설치되어 있지 않습니다.
    echo PowerShell 창에서 다음 명령어 실행 후 다시 시도하세요:
    echo pip install git-filter-repo
    pause
    exit /b
)

:: Step 2: .next와 node_modules Git 기록에서 제거
echo ✅ Git history에서 .next와 node_modules 제거 중...
git-filter-repo --path .next --path node_modules --invert-paths

:: Step 3: 기존 origin 제거 및 새로 추가
echo ✅ 원격 origin 주소 초기화...
git remote remove origin
git remote add origin https://github.com/guniorg/golf-hanoi-full-enhanced.git

:: Step 4: 변경사항 커밋
echo ✅ 변경사항 커밋...
git add .
git commit -m "Clean large files (.next, node_modules) and update .gitignore"

:: Step 5: 강제 푸시
echo ✅ 강제 push 실행 중...
git push -f origin main

echo =========================================
echo ✅ 완료! GitHub에 강제 푸시가 실행되었습니다.
pause
