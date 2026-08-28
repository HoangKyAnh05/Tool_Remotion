Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "D:\code_tino_19_4\Code_Tool_Python\Tool_Remotion"
WshShell.Run "cmd /c npm run dev", 0, False
