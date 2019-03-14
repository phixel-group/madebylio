
//COMO USARLA
/*onAppend(document.body, function(added) {
    console.log(added) // [p]
})*/
function create_object_tag(id,clase,data,type,where)
{
	var objeto = document.createElement('object');
	objeto.id  = id;
	$(objeto).addClass(clase);
	$(objeto).attr('data',data);
	$(objeto).attr('type',type);
	if(where === undefined)
	{

	}
	else
	{
	    document.querySelector(where).appendChild(objeto);
	}
	return objeto;
}
function create_object_tag_V1(id,clase,data,type,where)
{
	var objeto = document.createElement('object');
	if (id==='')
	{

	}
	else
	{
		objeto.id  = id;
	}
	$(objeto).addClass(clase);
	$(objeto).attr('data',data);
	$(objeto).attr('type',type);
	if(where === undefined)
	{

	}
	else
	{
	    where.appendChild(objeto);
	}
	return objeto;
}
function create_img_tag(id,clase,url_src,where)
{
	var img = document.createElement('img');
	img.id  = id;
	$(img).addClass(clase);
	$(img).attr('src',url_src);
	document.querySelector(where).appendChild(objeto);
	return img;
}
function create_div_tag(id,clase,where)
{
	var objeto = document.createElement('div');
	objeto.id  = id;
	$(objeto).addClass('troqueles');
	if(where === undefined)
	{

	}
	else
	{
	    document.querySelector(where).appendChild(objeto);
	}

	return objeto;
}
function create_checkbox_tag(id,clase,where)
{
	var objeto = document.createElement('input');
	objeto.id  = id;
	$(objeto).attr('type','checkbox');
	//$(objeto).attr('defaultChecked','false');
	$(objeto).addClass(clase);
	if(where === undefined)
	{

	}
	else
	{
	    document.querySelector(where).appendChild(objeto);
	}

	return objeto;
}


/*Convertir object svg en div plano para drag and drop*/
function objectsvg2planediv(object)
{
	var svg = object.querySelector('svg');
    svg.style.width = 90+'%';
    svg.style.height = 90+'%';
    obj_products.innerHTML = new XMLSerializer().serializeToString(svg);
    var nombres = datos.nombre_producto;
    var precios = datos.precio_producto;
    obj_products.setAttribute('draggable','true');
    obj_products.fromto = 'productos';
}