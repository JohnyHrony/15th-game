/**
 * Created single Sector
 * @param {number} tagWidth - Tag width
 * @param {number} tagHeight - Tag height
 * @param {number} gameFieldPositionX - Position x on game field
 * @param {number} gameFieldPositionY - Position y on game field
 * @param {number} sourceImagePositionX - Position x on Source image of Tag
 * @param {number} sourceImagePositionY - Position y on Source image of Tag
 * @param {number} tagNumber - Number of Tag
 * @constructor
 */
function SingleSector(tagWidth, tagHeight, gameFieldPositionX, gameFieldPositionY, sourceImagePositionX, sourceImagePositionY, tagNumber){
	this.sec_width = tagWidth;
	this.sec_height = tagHeight;
	this.pos_x = gameFieldPositionX;
	this.pos_i_x = sourceImagePositionX;
	this.pos_y = gameFieldPositionY;
	this.pos_i_y = sourceImagePositionY;
	this.numb = tagNumber;
}

/**
 * Method which painting canvas elements
 * @param context - context
 * @param pic -picture
 * @returns {SingleSector}
 */
SingleSector.prototype.render = function(context,pic){
	context.drawImage(pic, this.pos_i_x, this.pos_i_y, this.sec_width , this.sec_height, this.pos_x, this.pos_y, this.sec_width ,this.sec_height);

	return this;
};