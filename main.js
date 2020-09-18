/*
Descrizione:
Facciamo una chiamata ajax all'api di boolean al seguente indirizzo.
https://flynn.boolean.careers/exercises/api/array/music
L'api ci restituirà decina di dischi musicali che dovremo stampare a schermo con Handlebars.
Concentratevi sulla parte JS per la grafica potrete utilizzare il layout che troverete al seguente link
https://bitbucket.org/booleancareers/ex-dischi-musicali-layout/downloads/
Bonus:
Creare una select con i seguenti generi: pop, rock, metal e jazz.
In base a cosa scegliamo nella select vedremo solo i corrispondenti cd.
*/

$(document).ready(function	() {
	//	Chiamata ajax all'end-point
	$.ajax({
		url: 'https://flynn.boolean.careers/exercises/api/array/music',
		type: 'GET',
		success: function	(data)	{
			// Salvo il mio array di oggetti in una variabile
			var results = data.response;
			// usa una funzione per manipolarli
			render(results);
		}
	});
	// Scelgo un genere dal menu
	$('#genre').click(function	() {
		// attribuisco alla variabile il valore corrispondente al genere
		var genreSelect = $(this).val();
		// ciclo i miei album
		$('.cds-container .cd').each(function	() {
			// setto una variabile con l'attributo che contiene il genere dei singoli album
			var genreAlbum = $(this).attr('data-genre').toLowerCase();
			// Se seleziono all visualizzo tutti gli album
			if (genreSelect === 'all') {
				$(this).fadeIn(1000);
			} else {
				// Altrimentoi visualizzo solo gli album del genere che ho selezionato
				if (genreSelect === genreAlbum) {
					$(this).fadeIn(1000);
				} else {
					$(this).fadeOut(1000);
				}
			}
		});
	});
});

function render (myJsonArray)	{
	// Uso handlebars
	var source = $('#entry-template').html();
	var template = Handlebars.compile(source);
	// Ciclo il mio array
	for (var i = 0; i < myJsonArray.length; i++) {
		// Ogni oggetto dell'array verrà letto e inserito nell'Html
		var html = template(myJsonArray[i]);
		$('.cds-container').append(html);
	}
}
