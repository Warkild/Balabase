document.addEventListener('DOMContentLoaded', init);

//GRAPHIQUES STATISTIQUES GLOBALES

google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Type', 'Références'],
          ['Couvre-Chefs',     couvre_chefs.length],
          ['Vêtements',      vetements.length],
          ['Accessoires Portables',      accessoires_portables.length]
        ]);

        var options = {
          pieHole: 0.80,
          colors: ['#333740', '#76bbcb',  '#c9e265'],
          legend: {position: 'none'},
          backgroundColor: {fillOpacity: 0.0}
        };


        var chart = new google.visualization.PieChart(document.getElementById('statistiques_globales_1'));
        chart.draw(data, options);
      }



function init() {

  // AFFICHAGE STATISTIQUES

  // NB TOTAL REFERNCES 

  nb_total_reference = 0;
  nb_total_reference += couvre_chefs.length;
  nb_total_reference += vetements.length;
  document.getElementById("insert_nb_total_references").innerHTML = nb_total_reference;

  // NB TOTAL ARTICLES

  nb_total_articles = 0
  for (var i=0;i<couvre_chefs.length;i++) {
    nb_total_articles += couvre_chefs[i]["quantite"]
  }
  for (var i=0;i<vetements.length;i++) {
    nb_total_articles += vetements[i]["quantite"]
  }
  document.getElementById("insert_nb_total_articles").innerHTML = nb_total_articles;

}
