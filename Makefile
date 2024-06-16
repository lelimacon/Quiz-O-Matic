ifeq ($(suffix $(SHELL)),.exe)
IS_WINDOWS = 1
endif


app_build:
#forfiles /p ".\app\www\" /s /C "cmd /c echo toto"
#copy ".\app\www\index.html" ".\app\out\index.html" /Y
	robocopy ${CURDIR}\app\www ${CURDIR}\app\out /E
	cd app && elm make src/Main.elm --output out/app.js


quiz_generate:
	typst compile lib/main.typ --root .


clean:
ifdef IS_WINDOWS
	forfiles /p "." /s /m *.pdf /C "cmd /c del @path"
	rmdir /s /q ".\app\out"
else
	find "." -name *.pdf -type f
	rm -rf "./app/out"
endif
