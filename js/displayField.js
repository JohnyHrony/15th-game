/**
 *
 * @param {integer} width - Game field width
 * @param {integer} height - Game field height
 * @constructor
 */

function DisplayField(width, height){
	this.width = width;
	this.height = height;
	/**
	 * Game field
	 * @type {Element}
     */
	this.gameField = document.getElementById("gameField")
	/**
	 * Create new image object
	 */
	this.pic = new Image();
	/**
	 * Src games background
	 * @type {string}
     */
	this.pic.src  = 'img/Jarod.jpg';
}

/**
 * Method which display start position tags on game field
 * @returns {Array}
 */

DisplayField.prototype.show = function(){
	var ctx = this.gameField.getContext('2d'),
		pic = this.pic;
	var allTags = [];
	var that = this;

	for(var y = 0, j = 1; y < 4; y++){
		allTags[y] = [];
		for(var x = 0; x < 4; x++){
			var obj = new SingleSector(this.width/4,this.height/4,(x == 0) ? 0 : x*this.width/4,(y==0) ? 0 : y*this.height/4,(x == 0) ? 0 : x*this.width/4,(y==0) ? 0 : y*this.height/4, j);
			allTags[y][x] = obj;
			j++;
		}
	}

	pic.onload = function() {
		imageReady = true;
		that.clearTags(ctx,this.width, this.height);
		that.displayTags(allTags, ctx, pic);
	}

	this.gameField.width  = this.width;
	this.gameField.height = this.height;
	pic.src = this.pic.src;

	return allTags;

}

/**
 * Method wich is confusing tags
 * @returns {Array}
 */

DisplayField.prototype.mixTags = function(){
	var elements = this.show();
	var ctx = this.gameField.getContext('2d'),
		pic = this.pic;
	pic.src = this.pic.src;
	/**
	 * Count random clicks
	 * @type {number}
     */
	var randomClicksNumber = 500;
	/**
	 * Max x or y coords position
	 * @type {number}
     */
	var coordsConst = 3;
	/**
	 * Count rows or colums
	 * @type {number}
     */
	var rowsColumsCount = 4;

	for(var i = 1; i < randomClicksNumber; i++){
		var coords = [Math.round(Math.random()*coordsConst),Math.round(Math.random()*coordsConst)];
		this.clearTags(ctx,this.width, this.height);
		elements = this.checkSibl(elements, coords, this.width/rowsColumsCount, this.height/rowsColumsCount);
		this.displayTags(this.checkSibl(elements, coords, this.width/rowsColumsCount, this.height/rowsColumsCount), ctx, pic);
	}
	return elements;
}

/**Check near elements and move tags**/
/**
 * Method which find clicked tag and check near elements(trying to find a zero element)
 * @returns {DisplayField}
 */
DisplayField.prototype.drowTags = function(){
	var elements = this.mixTags();
	var canvas = this.gameField;
	var ctx = this.gameField.getContext('2d'),
		pic = this.pic;
	pic.src = this.pic.src;
	var that = this;
	/**
	 * Count rows or colums
	 * @type {number}
	 */
	var rowsColumsCount = 4;


	canvas.addEventListener("click", function(event){
		var clickX = event.clientX - canvas.offsetLeft;
		var clickY = event.clientY - canvas.offsetTop;
		var coords = that.findCurrentTag(clickX, clickY,this.width/rowsColumsCount,this.height/rowsColumsCount);
		that.clearTags(ctx,this.width, this.height);
		that.displayTags(that.checkSibl(elements, coords, this.width/rowsColumsCount, this.height/rowsColumsCount), ctx, pic);


		if(that.check(elements) == 16){
			alert("Game Over");
			window.location.reload();
		}
	});

	return this;
}

/**
 * Method which reflects the elements on the game field
 * @param array {array}- tags array
 * @param ctx - context
 * @param pic{object} - picture
 * @returns {*}
 */
DisplayField.prototype.displayTags = function(array, ctx, pic){
	for(var i = 0; i < array.length; i++ ){
		for(var j = 0; j < array[i].length; j++){
			if(array[i][j].numb == 16){
				array[i][j] = array[i][j];
			}else{
				array[i][j].render(ctx, pic);
			}
		}
	}
	return array;
}
/**
 * Method which clear game field
 * @param ctx - context
 * @param fieldWidth {number} - Games field width
 * @param fieldHeight {number} - Games field height
 */
DisplayField.prototype.clearTags = function(ctx, fieldWidth, fieldHeight){
	ctx.clearRect(0, 0, fieldWidth, fieldHeight);
}
/**
 *
 * @param coordX {number} - Coords X on game field
 * @param coordY {number} - Coords Y on game field
 * @param tagWidth {number} - Single Tags width
 * @param tagHeight {number} - Single Tags height
 * @returns {*[]}
 */
DisplayField.prototype.findCurrentTag = function(coordX, coordY, tagWidth, tagHeight){
	return [ Math.floor(coordX/tagWidth), Math.floor(coordY/tagHeight)];
}

/**
 * Method which check whether collected game
 * @param elementsArray {array} Tags array
 * @returns {number}
 */
DisplayField.prototype.check = function(elementsArray){
	var check_arr = 0;
	for(var i = 0, c = 1; i < elementsArray.length; i++){
		for(var j = 0; j < elementsArray[i].length; j++, c++ ){
			if(elementsArray[i][j].numb == c){
				check_arr++;
			}
		}
	}
	return check_arr;
}

/**
 * Method which finding near zero element
 * @param elements {array} - Tags array
 * @param coords {array} - Coords array
 * @param w {number} - Single tag width
 * @param h {number} - Single tag height
 * @returns {*}
 */
DisplayField.prototype.checkSibl = function(elements, coords, w, h){
	/**
	 * Zero elements number
	 * @type {number}
     */
	var zeroElementNumb = 16;
	if(coords[0] > 0){
		if(elements[coords[1]][coords[0] - 1].numb == zeroElementNumb){
			elements[coords[1]][coords[0]].pos_x -= w;
			elements[coords[1]][coords[0] - 1].pos_x += w;

			var temp = elements[coords[1]][coords[0]];
			elements[coords[1]][coords[0]] = elements[coords[1]][coords[0] - 1];
			elements[coords[1]][coords[0] - 1] = temp;

		}
	}
	if(coords[0] < 3){
		if(elements[coords[1]][coords[0] + 1].numb == zeroElementNumb){

			elements[coords[1]][coords[0]].pos_x += w;
			elements[coords[1]][coords[0] + 1].pos_x -= w;

			var temp = elements[coords[1]][coords[0]];
			elements[coords[1]][coords[0]] = elements[coords[1]][coords[0] + 1];
			elements[coords[1]][coords[0] + 1] = temp;
		}
	}
	if(coords[1] > 0){
		if(elements[coords[1] - 1][coords[0]].numb == zeroElementNumb){
			elements[coords[1]][coords[0]].pos_y -= h;
			elements[coords[1] - 1][coords[0]].pos_y += h;

			var temp = elements[coords[1]][coords[0]];
			elements[coords[1]][coords[0]] = elements[coords[1] - 1][coords[0]];
			elements[coords[1] - 1][coords[0]] = temp;
		}
	}
	if(coords[1] < 3){
		if(elements[coords[1] + 1][coords[0]].numb == zeroElementNumb){
			if(elements[coords[1] + 1][coords[0]].numb == zeroElementNumb){
				elements[coords[1]][coords[0]].pos_y += h;
				elements[coords[1] + 1][coords[0]].pos_y -= h;

				var temp = elements[coords[1]][coords[0]];
				elements[coords[1]][coords[0]] = elements[coords[1] + 1][coords[0]];
				elements[coords[1] + 1][coords[0]] = temp;
			}
		}
	}
	return elements;
}