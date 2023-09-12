AFRAME.registerComponent("Model", {
  init: async function() {
    var compounds = await this.getCompounds();

    var barcodes = Object.keys(compounds);

    barcodes.map(barcode => {
      var element = compounds[barcode];
      this.createAtoms(element);
    });
  },
  getModels: function() {
    return fetch("js/compoundList.json")
      .then(res => res.json())
      .then(data => data);
  },
 
  createModels: async function(model) {
    var barcodeValue = model.barcode_value;
    var modelURL = model.model_url;
    var modelName = model.model.name;

    var scene = document.querySelector("a-scene");

    var marker = document.createElement("a-marker");

    marker.setAttribute("id", `marker-${modelName}`);
    marker.setAttribute("type", "barcode");
    marker.setAttribute("model_name", modelName);
    marker.setAttribute("value", barcodeValue);
    marker.setAttribute("markerhandler", {});

    scene.appendChild(marker);

    if (barcodeValue === 0){
      var modelE1 = document.createElement("a-entity");
      modelE1.setAttribute("id" , `${modelName}`);
      modelE1.setAttribute("geometry",{
        primitive: "box" ,
        width: model.width,
        height: model.height
      });

      modelE1.setAttribute("position", model.position);
      modelE1.setAttribute("rotation", model.rotation);
      model.setAttribute("material", {
        color: model.color
      });
      marker.appemdChild(modelE1);

    } else {
      var modelE1 = document.createElement("a-entity");
      modelE1.setAttribute("id", `${modelName}`);
      modelE1.setAttribute("gltf-model" , `url(${modelUrl})`);
      model.setAttribute("scale" , model.scale);
      model.setAttribute("position" , model.position);
      model.setAttribute("rotation" , model.rotation);

      marker.appendChild(modelE1);
    }

   

    
  }
  
});
