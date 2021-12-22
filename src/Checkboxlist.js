import React from 'react';
import CheckboxTree from 'react-checkbox-tree';


const nodes = [
    {
        value: '/app',
        label: 'India',
        children: [
            {
                value: '/app/Http',
                label: 'Madhapradesh',
                children: [
                    {
                        value: '/app/Http/Controllers',
                        label: 'Indore'
                    },
                    {
                        value: '/app/Http/routes.js',
                        label: 'Bhopal',
                    },
                    {
                        value: '/app/Http/harda',
                        label: 'harda',
                    },
                
                ],
            },
            {
                value: '/app/Providers',
                label: 'West Bangal',
                children: [{
                    value: '/app/Http/Providers/EventServiceProvider.js',
                    label: 'Kolkata',
                },
                {
                  value: '/app/Http/Providers/alipurduar',
                  label: 'alipurduar',
              },
              {
                value: '/app/Http/Providers/Bankura',
                label: 'Bankura',
            }],
            },
            {
                value: '/app/Karnataka',
                label: 'Karnataka',
                children: [{
                  value: '/app/Http/Providers/Karnataka',
                  label: 'Shivamogga',
              },
              {
                value: '/app/Http/Providers/udupi',
                label: 'udupi',
            },
            {
              value: '/app/Http/Providers/Vijaypura',
              label: 'viyajpura',
          }
            ],
            }
        ],
    }
    
];

class CheckboxList extends React.Component {
    state = {
        checked: [
            '/app/Http/Controllers/WelcomeController.js',
            '/app/Http/routes.js',
            '/public/assets/style.css',
            '/public/index.html',
            '/.gitignore',
        ],
        expanded: [
            '/app',
        ],
        filterText: '',
        nodesFiltered: nodes,
        nodes,
    };

    constructor(props) {
        super(props);

        this.onCheck = this.onCheck.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.filterTree = this.filterTree.bind(this);
        this.filterNodes = this.filterNodes.bind(this);

        this.submitClick= this.submitClick.bind(this);
    }

    onCheck(checked) {
        this.setState({ checked });
    }

    onExpand(expanded) {
        this.setState({ expanded });
    }

    onFilterChange(e) {
        this.setState({ filterText: e.target.value }, this.filterTree);
    }

    filterTree() {
        // Reset nodes back to unfiltered state
        if (!this.state.filterText) {
            this.setState((prevState) => ({
                nodesFiltered: prevState.nodes,
            }));

            return;
        }

        const nodesFiltered = (prevState) => (
            { nodesFiltered: prevState.nodes.reduce(this.filterNodes, []) }
        );

        this.setState(nodesFiltered);
    }

    filterNodes(filtered, node) {
        const { filterText } = this.state;
        const children = (node.children || []).reduce(this.filterNodes, []);

        if (
            // Node's label matches the search string
            node.label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1 ||
            // Or a children has a matching node
            children.length
        ) {
            filtered.push({ ...node, children });
        }

        return filtered;
    }
submitClick(e) {
    e.preventDefault();
    console.log(this.checked);
};
    render() {
        const {
            checked,
            expanded,
            filterText,
            nodesFiltered,
        } = this.state;
    
        return (
           <form onSubmit={this.submitClick}>
                <div className="filter-container">
                    <p>
                        Note:Enter city ,state name in the serch field
                    </p>
                    <p>
                        Note:Click on pink box to explore more 
                    </p>
                    <label for="Search Name">
                        Enter Name
                    </label>
                <input
                    className="filter-text"
                    placeholder="Search..."
                    type="text"
                    value={filterText}
                    onChange={this.onFilterChange}
                />
                <CheckboxTree
                    checked={checked}
                    expanded={expanded}
                    iconsClass="fa5"
                    nodes={nodesFiltered}
                    onCheck={this.onCheck}
                    onExpand={this.onExpand}
                  
                />
            </div>
            <input type="submit" value="submit" />
          
           </form>
        );
    }
}

export default CheckboxList;
