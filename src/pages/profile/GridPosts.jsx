import Grid from "../../../public/icons/svg/Grid";




const GridPosts = () => {
    return (
        <div className="createPost">
            <div className="createPost_header" style={{ justifyContent: "space-between" }}>
                <div className="left_header_grid">Posts</div>
                <div className="flex">
                    <div className="gray_btn">
                        <img style={{ width: "15px", height: "15px" }} src="../../images/equalize.png" alt="" />
                        Filters
                    </div>
                    <div className="gray_btn">
                        <i className="fas fa-manage"></i>
                        Manage Posts
                    </div>
                </div>
            </div>
            <div className="create_splitter"></div>
            <div className="createPost_body grid2" style={{ gridTemplateColumns: "repeat(2, fr)" }}>
                <div className="view_type active">
                    <i className="fas fa-list filter_blue"></i>
                    List view
                </div>
                <div className="view_type">
                    <Grid color="#65676b" size="15" />
                    Grid view
                </div>
            </div>
        </div >
    );
};

export default GridPosts;
