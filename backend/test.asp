<%

'------------------------------------ FUNCIONES AUXILIARES --------------------------------------------

Sub sendResponse(status, message, data)
	Response.AddHeader "Access-Control-Allow-Origin", "*"
	response.write("{""status"":" & status & ", ""message"":""" & message & """, ""data"":" & data & "}")
End Sub

Sub authenticateUser()
	Dim user
	Dim pass
	Dim rc

	user = Request.QueryString("user")
	pass = Request.QueryString("pass")
	rc = 0

	If rc = 0 Then
		call sendResponse(0, "Usuario autenticado", "[]")
	Else
		call sendResponse(3, "El Usuario o Contraseña ingresados son invalidos", "[]")
	End If
End Sub

Sub getProducts()
	Dim user
	Dim pass
	Dim rc

	user = Request.QueryString("user")
	pass = Request.QueryString("pass")
	rc = 0

	If rc = 0 Then
		call sendResponse(0, "Productos obtenidos", "[""BANCA"", ""ADMID"", ""G3"", ""LIMITES"", ""ACM""]")
	Else
		call sendResponse(4, "Error al obtener la lista de productos asociados al usuario " & user, "[]")
	End If
End Sub

Sub getDevelopers()
	Dim user
	Dim pass
	Dim product
	Dim rc

	user = Request.QueryString("user")
	pass = Request.QueryString("pass")
	product = Request.QueryString("product")
	rc = 0

	If rc = 0 Then
		call sendResponse(0, "Desarrolladores obtenidos", "[""DESA1"", ""DESA2"", ""DESA3"", ""DESA44"", ""DESA55""]")
	Else
		call sendResponse(5, "Error al obtener la lista de Desarrolladores asociados al producto " & product, "[]")
	End If
End Sub

Sub hasEvoStreams()
	Dim user
	Dim pass
	Dim product
	Dim rc

	user = Request.QueryString("user")
	pass = Request.QueryString("pass")
	product = Request.QueryString("product")
	rc = 0

	If rc = 0 Then
		call sendResponse(0, "Datos obtenidos", "[""true""]")
	Else
		call sendResponse(5, "Error al consultar si el producto " & product & " posee ramas evolutivas", "[]")
	End If
End Sub

Sub getReleseTypes()
	Dim user
	Dim pass
	Dim product
	Dim rc

	user = Request.QueryString("user")
	pass = Request.QueryString("pass")
	product = Request.QueryString("product")
	rc = 0

	If rc = 0 Then
		call sendResponse(0, "Relese Types obtenidos", "[""Normal"", ""NormalSinPrepro"", ""Emergencia"", ""Directo""]")
	Else
		call sendResponse(5, "Error al obtener los Release Rypes asociados al producto " & product, "[]")
	End If
End Sub

Sub createObjects()
	Dim user
	Dim pass
	Dim product
	Dim rc

	user = Request.Form("user")
	pass = Request.Form("pass")
	product = Request.Form("product")
	rc = 0

	If rc = 0 Then
		call sendResponse(0, "Objetos creados satisfactoriamente", "[]")
	Else
		call sendResponse(5, "Error al crear los objetos del producto " & product , "[]")
	End If
End Sub

'-------------------------------------------- MAIN ----------------------------------------------------

Dim action

If Request.ServerVariables("REQUEST_METHOD") = "GET" Then
	action = Request.QueryString("action")
	Select Case action
		Case "authenticateUser"
			call authenticateUser()
		Case "getProducts"
			call getProducts()
		Case "getDevelopers"
			call getDevelopers()
		Case "hasEvoStreams"
			call hasEvoStreams()
		Case "getReleseTypes"
			call getReleseTypes()
		Case Else
			call sendResponse(3, "La accion " & action & " no esta definida para el metodo GET", "[]")
	End Select
ElseIf Request.ServerVariables("REQUEST_METHOD") = "POST" Then
	action = Request.Form("action")
	Select Case action
		Case "createObjects"
			call createObjects()
		Case Else
			call sendResponse(3, "La accion " & action & " no esta definida para el metodo POST", "[]")
	End Select
End If

%>